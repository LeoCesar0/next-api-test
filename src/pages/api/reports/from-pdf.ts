import { NextApiRequest, NextApiResponse } from "next";
import {
  ReadPDFResponse,
  reportFromPDF,
} from "@/server/routes/reports/fromPDF";
import { EXCEPTIONS } from "@/server/routes/reports/fromPDF/exceptions";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReadPDFResponse>
) => {
  try {
    return await reportFromPDF(req, res);
  } catch (err) {
    res.status(500).json({
      error: { message: EXCEPTIONS.INTERNAL },
      done: false,
      data: null,
    });
  }
};

export default handler;
