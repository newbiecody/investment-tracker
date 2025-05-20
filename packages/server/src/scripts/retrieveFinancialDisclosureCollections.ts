import { XMLParser } from "fast-xml-parser";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import pLimit from "p-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFdXml = async (path: string) => {
  try {
    const parser = new XMLParser();
    const xmlData = await fs.readFile(path, "utf-8");

    const parsed = parser.parse(xmlData);
    return parsed.FinancialDisclosure;
  } catch (error) {
    console.error(`Error when reading xml file: ${error}`);
  }
};

const limit = pLimit(10); // Max 10 concurrent directory reads

export const collectXmlPaths = async (rootDir: string): Promise<string[]> => {
  const xmlPaths: string[] = [];
  const queue: string[] = [rootDir];

  while (queue.length > 0) {
    const batch = queue.splice(0, queue.length); // Take current batch of directories

    const tasks = batch.map((dirPath) =>
      limit(async () => {
        try {
          const entries = await fs.readdir(dirPath, { withFileTypes: true });

          for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
              queue.push(fullPath); // Queue for next round
            } else if (entry.isFile() && fullPath.endsWith(".xml")) {
              xmlPaths.push(fullPath);
            }
          }
        } catch (err) {
          console.error(`Failed to read ${dirPath}:`, err);
        }
      })
    );

    await Promise.all(tasks); // Wait for current batch to finish
  }

  return xmlPaths;
};

const getFdXml = async (xmlPath?: string) => {
  const fdDisclosureReportsCollection = path.join(
    __dirname,
    "..",
    "reports",
    "financial-disclosure-reports"
  );

  //   if (isDefined(xmlPath)) {
  //     return [path.join(fdDisclosureReportsCollection, xmlPath) as Path];
  //   }

  return await collectXmlPaths(fdDisclosureReportsCollection);
};

export const readAllFdXml = async () => {
  return await getFdXml();
};
