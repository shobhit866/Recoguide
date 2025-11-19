import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractTextFromFile(file) {
  const type = (file.type || "").toLowerCase();

  if (type.includes("pdf")) return extractFromPdf(file);
  if (type.startsWith("image/")) return extractFromImage(file);
  if (type.includes("text")) return file.text();

  // fallback by extension
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) return extractFromPdf(file);
  if (/\.(png|jpg|jpeg|bmp|webp)$/i.test(name)) return extractFromImage(file);
  if (/\.(txt|csv)$/i.test(name)) return file.text();

  throw new Error("Unsupported file type");
}

async function extractFromPdf(file) {
  const buf = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: buf });
  const pdf = await loadingTask.promise;
  let full = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((it) => it.str);
    full += strings.join(" ") + "\n";
  }
  return full.trim();
}

async function extractFromImage(file) {
  const { data } = await Tesseract.recognize(file, "eng");
  return (data.text || "").trim();
}
