import { readdir } from "fs/promises";
import { NextResponse } from "next/server";

export async function GET() {
  const files = await readdir("public/audio");
  const tracks = files.map((file) => ({
    name: file.replace(/\.[^.]+$/, ""),
    src: `/audio/${file}`,
  }));

  return NextResponse.json(tracks);
}
