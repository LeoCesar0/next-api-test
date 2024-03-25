import { Report } from "@/@types/report";
import { IPDFRawData } from "../rawDataTypes";
import { PDFParser } from "./@types";
import { randomUUID } from "crypto";
import { decodeText } from "./utils/decodeText";

export class MyBankParser implements PDFParser {
  parse(data: IPDFRawData[], bankAccountId: string): Report[] {
    const result: Report[] = [];

    data.forEach((rawPDFData) => {
      const report: Report = {
        bankAccountId: bankAccountId,
        deposit: 0,
        expenses: 0,
        finalBalance: 0,
        id: randomUUID(),
      };

      const { Pages } = rawPDFData;

      Pages.forEach(({ Texts }, pageIndex) => {
        Texts.forEach((textData, textIndex) => {
          const { R, x, y } = textData;
          const rawText = R[0].T || "";
          const currentText = decodeText(rawText);
          const amount = isNaN(Number(currentText))
          ? null
          : Number(currentText);

          if (amount) {
            if (amount > 0) {
              report.deposit += amount;
            }
            if (amount < 0) {
              report.expenses += amount;
            }
          }
          return;
        });

        report.finalBalance = report.deposit + report.expenses;
        result.push(report);
      });
    });

    return result;
  }
}
