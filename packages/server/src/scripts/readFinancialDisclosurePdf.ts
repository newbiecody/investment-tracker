// parseWithPdfjs.ts
import axios from "axios";
import { MongoClient } from "mongodb";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

// PDF.js needs a worker
// import { GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
// GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");

const PDF_URL =
  "https://disclosures-clerk.house.gov/public_disc/financial-pdfs/2017/10020995.pdf";
const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "financial_disclosures";
const COLLECTION_NAME = "reports";

async function fetchPdfBuffer(url: string): Promise<Uint8Array> {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return new Uint8Array(response.data);
}

async function extractTextFromPdf(buffer: Uint8Array): Promise<string> {
  const loadingTask = getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    fullText += strings.join(" ") + "\n\n";
  }

  return fullText;
}

async function saveToMongo(docId: string, text: string) {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.insertOne({
      docId,
      extractedAt: new Date(),
      content: text,
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function main() {
  const docId = "10020995";
  const url = `https://disclosures-clerk.house.gov/public_disc/financial-pdfs/2017/${docId}.pdf`;

  try {
    console.log("📥 Fetching PDF...");
    const buffer = await fetchPdfBuffer(url);

    console.log("📄 Extracting text using pdfjs-dist...");
    const text = await extractTextFromPdf(buffer);

    console.log(text);
    // await saveToMongo(docId, text);

    console.log("Successfully extracted the data.");
  } catch (err) {
    console.error("Error when extracting data.", err);
  }
}

main();
