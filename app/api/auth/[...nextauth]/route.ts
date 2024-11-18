import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

// تحديد المعالج الخاص بـ NextAuth
export const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

// تصدير المعالج
export { handler as GET, handler as POST };
