import { AppModelResponse } from "@/@types";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { EXCEPTIONS } from "./exceptions";
import { ReportsService } from "@/server/services/reports";
import { Report } from "@/@types/report";
import { MyBankParser } from "@/server/services/reports/parsers/MyBank";

export type PDF2JSONResponse = AppModelResponse<Report[]>;

export const readPdfFilesRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<PDF2JSONResponse>
) => {
  const form = formidable({ multiples: true });

  const readFilesPromise = new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, { files }) => {
      const bankAccountId = fields.bankAccountId as string;

      // --------------------------
      // Req Validations
      // --------------------------

      if (!bankAccountId) {
        const response: PDF2JSONResponse = {
          error: { message: EXCEPTIONS.NO_BANK_ACCOUNT_ID },
          done: false,
          data: null,
        };
        res.status(422).json(response);
        reject(response);
      }

      const reportsService = new ReportsService({ bankAccountId });

      if (err) {
        const response: PDF2JSONResponse = {
          error: { message: EXCEPTIONS.ERROR_READING_PDF },
          done: false,
          data: null,
        };
        res.status(500).json(response);
        reject(response);
      }

      if (!Array.isArray(files)) {
        files = [files];
      }

      // --------------------------
      // READ DATA
      // --------------------------
      await reportsService.readFromPDFs({ files });

      // --------------------------
      // PARSE DATA
      // --------------------------
      const parser = new MyBankParser();

      const parsedReports = await reportsService.parsePDFs(parser);

      // --------------------------
      // PROCESS DATA
      // --------------------------
      await reportsService.processPDFs();

      // --------------------------
      // Validation
      // --------------------------
      const findValid = parsedReports.find((report) => report.id);

      if (!parsedReports || !findValid) {
        const response: PDF2JSONResponse = {
          error: { message: EXCEPTIONS.INVALID_PDF },
          done: false,
          data: null,
        };
        res.status(400).json(response);
        reject(response);
      }

      // --------------------------
      // Resolution
      // --------------------------

      res.status(200).json({
        data: parsedReports,
        done: true,
        error: null,
      });
      resolve(parsedReports);
    });
  });

  await readFilesPromise;

  return res;
};
