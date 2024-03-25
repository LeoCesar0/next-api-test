import { Report } from "@/@types/report";
import { IPDFRawData } from "../rawDataTypes";
import { PDFParser } from "./@types";

// THIS IS A MOCKED PARSED

export class BankABCParser implements PDFParser {
  parse(data: IPDFRawData[], bankAccountId: string): Report[] {
    const report: Report = {
      id: "123",
      bankAccountId,
      finalBalance: 100,
      expenses: 50,
      deposit: 150,
    };
    return [report];
  }
}
