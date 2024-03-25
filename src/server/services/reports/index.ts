import { Report } from "@/@types/report";
import { REPORTS_DB } from "@/db/reportsDB";
import { randomUUID } from "crypto";
import formidable from "formidable";
import { getPDFRawData } from "./getPDFRawData";
import { IPDFRawData } from "./rawDataTypes";
import { PDFParser } from "./parsers/@types";

interface ReadFromPDFs {
  files: formidable.File[];
}

export class ReportsService {
  rawData: IPDFRawData[] | null = null;
  parsedData: Report[] | null = null;
  bankAccountId: string;

  constructor({ bankAccountId }: { bankAccountId: string }) {
    this.bankAccountId = bankAccountId;
  }

  create = async (report: Omit<Report, "id">) => {
    const id = randomUUID();
    REPORTS_DB.push({ ...report, id });
  };
  getById = async (id: string) => {
    return REPORTS_DB.find((item) => item.id === id);
  };
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
  async parsePDFs(parser: PDFParser) {
    if (!this.rawData) {
      throw new Error("No PDF data to parse");
    }
    this.parsedData = parser.parse(this.rawData, this.bankAccountId);
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
