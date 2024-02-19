import { saveToDatabase } from "../../services/wod";
import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const database = JSON.parse(readFileSync("app/db/db.json", "utf-8"));

  await saveToDatabase(database);

  return NextResponse.json(database);
}