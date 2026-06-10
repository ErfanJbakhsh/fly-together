import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function DELETE(req: NextRequest) {
  const { src } = await req.json();
  const fileName = src.split("/").pop();
  const filePath = path.join(process.cwd(), "public/audio", fileName);
  await unlink(filePath);
  return NextResponse.json({ success: true });
}
