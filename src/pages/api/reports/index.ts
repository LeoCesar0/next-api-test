import { ReportsService } from "@/server/services/reports";
import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const service = new ReportsService()
    const reports = await service.getAll()
    res.status(200).json({
      done: true,
      data: reports,
      error: null,
    });
  } else {
    res.status(405).json({
      error: { message: "Method not allowed" },
      done: false,
      data: null,
    });
  }

  return res;
};

export default handler;
