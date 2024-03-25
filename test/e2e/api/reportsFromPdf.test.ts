import { TEST_BANK } from "@/db/bankAccountsDB";
import "isomorphic-fetch";
import "isomorphic-form-data";

describe("Create transactions report from PDF file", () => {
  // SHOULD FETCH WITH METHOD POST TO /reports/from-pdf
  // UPLOADING ONE OR MULTIPLE PFDs (EACH PDF INCLUDES TRANSACTIONS IN A SPECIFIC BANK ACCOUNT'S PDF FORMAT)
  // EXTRACT DATA AND CREATE A REPORT OF THE TRANSACTIONS, ACCORDING TO THE ```REPORT``` INTERFACE DECLARED IN src/@types/report.ts

  // --------------------------
  // ERRORS
  // --------------------------

  describe("uploading data with errors", () => {
    it.todo("should return 422 if no bank account id provided");
    it.todo("should return 404 if METHOD is not POST");
    it.todo(
      "should return 422 file is not a pdf or is not the format expected"
    );
    it.todo("should return 500 if unknown error");
  });

  // --------------------------
  // SUCCESS
  // --------------------------

  describe("uploading public/test/transactions.pdf with TEST_BANK.id", () => {
    const expectedGeneratedReportId = "3defa831-a76d-40a1-926d-d7c68bb8d639"

    it.todo("should return 200 with parsed results if pdf is valid");

    // --------------------------
    // READ DATA
    // --------------------------
    describe("read pdf data and extract rawPdfData", () => {
      it.todo("extract PDFRawData");
    });

    // --------------------------
    // PARSE DATA
    // --------------------------
    describe("parse/read pdf transactions", () => {
      const expectedReport = {
        bankAccountId: TEST_BANK.id,
        deposit: 115,
        expenses: -250,
        finalBalance: -135,
        id: expectedGeneratedReportId,
      };
      it.todo(
        "should return an array of objects with the calculate finalBalance, expenses, deposit, bankAccountId, and id"
      );
    });

    // --------------------------
    // PROCESS DATA
    // --------------------------
    describe("process file data", () => {
      it.todo("should create a report on db with the parsed results");
    });

    // --------------------------
    // FINAL RESULT
    // --------------------------
    describe("api return", () => {
      const expectedResult = {
        data: [
          {
            bankAccountId: TEST_BANK.id,
            deposit: 115,
            expenses: -250,
            finalBalance: -135,
            id: expectedGeneratedReportId,
          },
        ],
        done: true,
        error: null,
      };
      it.todo("should return the expected result");
    });
  });
});
