import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-clinet";

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

    const notifications = await writeClient.fetch(
      `*[_type == "user" && tc == $id][0]{
        notifications[] {
          status
        }
      }`,
      { id: userId }
    );

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
