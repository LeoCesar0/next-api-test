import { readFile } from "fs/promises";

export const readJSONData = async (fileName: string) => {
  // const filePath = path.resolve(process.cwd(), "public", fileName);
  const base = "./db";
  const filePath = `${base}/${fileName}`;

  try {
    const data = await readFile(filePath, "utf-8");
    const lines = data.split("\n").filter(Boolean);
    if (!lines.length) return [];

    return lines.map((line) => JSON.parse(line));
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
