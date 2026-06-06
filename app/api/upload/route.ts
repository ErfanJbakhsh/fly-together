import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(process.cwd(), "public/audio", file.name);

  await writeFile(filePath, buffer);
  return NextResponse.json({ src: `/audio/${file.name}` });
}
