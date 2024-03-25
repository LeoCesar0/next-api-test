import { Report } from "@/@types/report";
import { randomUUID } from "crypto";
import formidable from "formidable";
import { getPDFRawData } from "./getPDFRawData";
import { IPDFRawData } from "./rawDataTypes";
import { PDFParser } from "./parsers/@types";
import { writeJSONData } from "@/utils/writeJSONdata";
import { readJSONData } from "@/utils/readJSONdata";

interface ReadFromPDFs {
  files: formidable.File[];
}

export class ReportsService {
  rawData: IPDFRawData[] | null = null;
  parsedData: Report[] | null = null;

  async create(report: Report) {
    const data = { ...report };
    await writeJSONData(data, "reports.ndjson");
  }
  async getById(id: string) {
    const reports = await readJSONData("reports.ndjson");
    if (!reports) return undefined;
    return reports.find((report: Report) => report.id === id);
  }
  async getAll() {
    const reports = await readJSONData("reports.ndjson");
    return (reports || []) as Report[]
  }
  async readFromPDFs({ files }: ReadFromPDFs): Promise<IPDFRawData[]> {
    const filePromises: Promise<IPDFRawData | null>[] = [];

    files.forEach(async (file) => {
      const pdfRawData = getPDFRawData({ file });
      filePromises.push(pdfRawData);
    });

    const pdfResultsArray = await Promise.all(filePromises);

    this.rawData = pdfResultsArray.filter(
      (item) => item !== null
    ) as IPDFRawData[];

    return this.rawData;
  }
  async parsePDFs(parser: PDFParser, bankAccountId: string) {
    if (!this.rawData) {
      throw new Error("No PDF data to parse");
    }
    this.parsedData = parser.parse(this.rawData, bankAccountId);
    return this.parsedData;
  }
  async processPDFs() {
    if (!this.parsedData) {
      throw new Error("No PDF parsed data");
    }

    this.parsedData.forEach(async (report) => {
      await this.create(report);
    });

    return true;
  }
}
