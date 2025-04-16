import { XMLParser } from "fast-xml-parser";
import fs from "fs";
// import { Path } from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFdXml = async (path: string) => {
  try {
    const parser = new XMLParser();
    const xmlData = fs.readFileSync(path, "utf-8");

    const parsed = parser.parse(xmlData);
    return parsed;
    // const members = parsed?.FinancialDisclosure?.Member;
    // if (!members || members.length === 0) {
    //   throw new Error("No Member data found in XML");
    // }
  } catch (error) {
    console.error(`Error when reading xml file: ${error}`);
  }
};

const collectXmlPathsRecursive = (dirPath: string) => {
  const xmlPaths: string[] = [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      xmlPaths.push(...collectXmlPathsRecursive(fullPath));
    } else if (entry.isFile() && fullPath.endsWith(".xml")) {
      xmlPaths.push(fullPath);
    }
  }

  return xmlPaths as string[];
};

const getFdXml = (xmlPath?: string) => {
  const fdDisclosureReportsCollection = path.join(
    __dirname,
    "..",
    "reports",
    "financial-disclosure-reports"
  );

  //   if (isDefined(xmlPath)) {
  //     return [path.join(fdDisclosureReportsCollection, xmlPath) as Path];
  //   }

  return collectXmlPathsRecursive(fdDisclosureReportsCollection);
};

export const readAllFdXml = async () => {
  return await Promise.all(getFdXml().map((xmlPath) => readFdXml(xmlPath)));
};
// const uploadDataToMongo = () => {
//   const client = new MongoClient(mongoUrl);
//   await client.connect();

//   const db = client.db(dbName);
//   const collection = db.collection(collectionName);

//   // Make sure it's an array
//   const data = Array.isArray(members) ? members : [members];

//   const result = await collection.insertMany(data);
//   console.log(`Inserted ${result.insertedCount} members into MongoDB`);

//   await client.close();
// };
// const getFinancialDisclosures = (year?: String) => {

// }
