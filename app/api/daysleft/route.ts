import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-clinet";
import { GET_DATE_BY_ID_OF_TANANT } from "@/sanity/lib/queries";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenant_id");

    if (!tenantId) {
      return NextResponse.json(
        { message: "tenant_id parameter is missing" },
        { status: 400 }
      );
    }

    const result = await writeClient.fetch(GET_DATE_BY_ID_OF_TANANT, {
      id: tenantId,
    });

    if (!result) {
      return NextResponse.json(
        { message: "No entry found for the provided tenant_id" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { girisTarihi: result.girisTarihi },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Internal server error", error: errorMessage },
      { status: 500 }
    );
  }
}
