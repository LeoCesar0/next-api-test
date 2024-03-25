import { appendFile } from "fs/promises";

export const writeJSONData = async (data: any, fileName: string) => {
  // const filePath = path.resolve(process.cwd(), "public", fileName);
  const base = "./db";
  const filePath = `${base}/${fileName}`;

  const stringifiedData = JSON.stringify(data).concat("\n");

  try {
    await appendFile(filePath, stringifiedData);
    console.log("Data written successfully");
  } catch (err) {
    console.error("WRITE FILE ERROR", err);
  }
};
