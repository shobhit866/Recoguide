import { supabase } from "../supabaseClient";
import dayjs from "dayjs";

export async function uploadReportFile(userId, file) {
  const ext = file.name.split(".").pop();
  const path = `${userId}/${dayjs().format("YYYY/MM/DD")}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("reports")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;
  return path;
}

export async function saveReportRow({ userId, file, storagePath, extractedText, parsed, summary, finalSummary, dietPlan }) {
  const { data, error } = await supabase.from("reports").insert({
    user_id: userId,
    file_name: file.name,
    file_type: file.type || "",
    storage_path: storagePath,
    extracted_text: extractedText,
    parsed,
    summary,
    final_summary: finalSummary,
    diet_plan: dietPlan,
  }).select("*").single();

  if (error) throw error;
  return data;
}

export async function saveReportValues({ reportId, userId, parsed }) {
  const rows = Object.entries(parsed).map(([code, o]) => ({
    report_id: reportId,
    user_id: userId,
    test_code: code,
    value: o.value,
    unit: o.unit,
    flag: o.flag,
  }));

  if (!rows.length) return;

  const { error } = await supabase.from("report_values").insert(rows);
  if (error) throw error;
}

export async function listReports() {
  const { data, error } = await supabase
    .from("reports")
    .select("id,file_name,created_at,parsed,summary,final_summary,diet_plan")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getReport(id) {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getTrends(testCode) {
  let q = supabase.from("report_values")
    .select("created_at,value,unit,flag,test_code")
    .order("created_at");

  if (testCode) q = q.eq("test_code", testCode);

  const { data, error } = await q;
  if (error) throw error;
  return data;
}
