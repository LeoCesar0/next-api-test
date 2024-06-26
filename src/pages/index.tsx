import { TEST_BANK } from "@/static/testData";
import { readFiles } from "@/utils/readFiles";
import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";

const HomePage: NextPage = () => {
  const [result, setResult] = useState();
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await fetch("/api/reports");
      const result = await response.json();
      console.log("REPORTS", result);
      setReports(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = readFiles(e);
      if (!files) throw new Error("Error reading files");
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("bankAccountId", TEST_BANK.id);
      const response = await fetch("/api/reports/from-pdf", {
        method: "POST",
        body: formData,
      });
      const result_ = await response.json();
      setResult(result_);

      await fetchReports();
    } catch (err) {
      console.error(err);
      setResult(undefined);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4 items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl">Welcome Wendel</h1>
        <h3>Upload the testing PDF in public folder</h3>
        <div>
          {result && (
            <>
              <div className="text-center" >
                <p className="mb-3" >File Uploaded!</p>
                <button
                  onClick={() => {
                    setResult(undefined);
                  }}
                  className="bg-green-600 px-4 py-2 rounded-md"
                >
                  Redo
                </button>
              </div>
            </>
          )}
          {!result && (
            <input
              multiple
              accept=".pdf"
              type="file"
              name="file"
              onChange={(e) => {
                handleUpload(e);
              }}
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 justify-between mt-4">
          <div className="border rounded-lg p-4 bg-green-900">
            <p className="border-b border-gray-400">Resposta do Upload:</p>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
          <div className="border rounded-lg p-4 bg-green-900">
            <p className="border-b border-gray-400">Reports DataBase:</p>
            <pre>{JSON.stringify(reports, null, 2)}</pre>
          </div>
        </div>
      </form>
    </>
  );
};

export default HomePage;
