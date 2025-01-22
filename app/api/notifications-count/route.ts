import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-clinet";
import { GET_STATUS_BY_ID } from "@/sanity/lib/queries";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const notifications = await writeClient.fetch(GET_STATUS_BY_ID, {
      id: userId,
    });

    const unreadCount = (notifications?.notifications || []).filter(
      (notif: any) => notif.status !== "read"
    ).length;

    return NextResponse.json({ count: unreadCount });
  } catch (error) {
    console.error("Error fetching notifications count:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications count." },
      { status: 500 }
    );
  }
}
