import { TEST_BANK } from "@/db/bankAccountsDB";
import { readFiles } from "@/utils/readFiles";
import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";

const HomePage: NextPage = () => {
  const [result, setResult] = useState();

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = readFiles(e);
      if (!files) throw new Error("Error reading files");
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("bankAccountId", TEST_BANK.id);
      const response = await fetch("/api/report/from-pdf", {
        method: "POST",
        body: formData,
      });
      const result_ = await response.json();
      setResult(result_);
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
          <input
            multiple
            accept=".pdf"
            type="file"
            name="file"
            onChange={(e) => {
              handleUpload(e);
            }}
          />
        </div>
        <div className='mt-4' >
        <p>RESPOSTA:</p>
        <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      </form>
    </>
  );
};

export default HomePage;
