import { Report } from "@/@types/report";
import { IPDFRawData } from "../rawDataTypes";

export interface PDFParser {
    parse(data: IPDFRawData[], bankAccountId: string): Report[];
  }