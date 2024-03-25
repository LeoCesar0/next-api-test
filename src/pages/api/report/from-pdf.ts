import { NextApiRequest, NextApiResponse } from "next";
import {
  PDF2JSONResponse,
  readPdfFilesRoute,
} from "@/server/routes/readPdfFilesRoute";
import { EXCEPTIONS } from "@/server/routes/readPdfFilesRoute/exceptions";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PDF2JSONResponse>
) => {
  try {
    return await readPdfFilesRoute(req, res);
  } catch (err) {
    res.status(500).json({
      error: { message: EXCEPTIONS.INTERNAL },
      done: false,
      data: null,
    });
  }
};

export default handler;
