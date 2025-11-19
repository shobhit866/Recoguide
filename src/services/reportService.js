import { supabase } from "../supabaseClient";
import dayjs from "dayjs";
import { CODE_MAP } from "../utils/codeMap";

/** Upload raw file to storage */
export async function uploadReportFile(userId, file) {
  const ext = file.name.split(".").pop();
  const path = `${userId}/${dayjs().format("YYYY/MM/DD")}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("reports").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

/** Save parsed report row */
export async function saveReportRow({ userId, file, storagePath, extractedText, parsed, summary, finalSummary, dietPlan }) {
  const { data, error } = await supabase.from("reports").insert({
    user_id: userId,
    file_name: file.name,
    file_type: file.type || "",
    storage_path: storagePath,
    extracted_text: extractedText,
    parsed,
    summary,
    final_summary: finalSummary || null,
    diet_plan: dietPlan || null
  }).select("*").single();

  if (error) throw error;
  return data;
}

/** Save flattened values for trends */
export async function saveReportValues({ reportId, userId, parsed }) {
  const rows = Object.entries(parsed).map(([code, o]) => ({
    report_id: reportId,
    user_id: userId,
    test_code: CODE_MAP[o.label] || code,
    value: o.value,
    unit: o.unit,
    flag: o.flag,
  }));

  if (!rows.length) return;

  const { error } = await supabase.from("report_values").insert(rows);
  if (error) throw error;
}

/** List all reports for logged-in user */
export async function listReports() {
  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes?.user) return [];

  const { data, error } = await supabase
    .from("reports")
    .select("id,file_name,created_at,parsed,summary,final_summary,diet_plan")
    .eq("user_id", userRes.user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/** Fetch a single report */
export async function getReport(id) {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  // generate public download link (if you want)
  if (data?.storage_path) {
    const { data: file } = supabase.storage
      .from("reports")
      .getPublicUrl(data.storage_path);

    data.download_url = file?.publicUrl || null;
  }

  return data;
}

/** Alias so ReportDetail.jsx works */
export async function getReportById(id) {
  return await getReport(id);
}

export async function listAvailableTests() {
  const { data, error } = await supabase
    .from("report_values")
    .select("test_code", { distinct: true });

  if (error) throw error;
  return data.map(r => r.test_code).filter(Boolean);
}


/** Fetch trend values */
export async function getTrends(testCode) {
  let q = supabase.from("report_values")
    .select("created_at,value,unit,flag,test_code")
    .order("created_at");

  if (testCode) q = q.eq("test_code", testCode);

  const { data, error } = await q;
  if (error) throw error;
  return data;
}
