import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

export async function verifyAdminToken(request: NextRequest) {
  const token = request.cookies.get("admin-token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
    userId: string;
    email: string;
    isAdmin?: boolean;
  };

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  if (!user) {
    throw new Error("Admin not found");
  }
  if (user.role !== "ADMIN" && !decoded.isAdmin) {
    throw new Error("Admin access required");
  }

  return decoded;
}