import { GET_BY_ID } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-clinet";

export async function PATCH(req: Request) {
  const { idhome, userId } = await req.json();

  try {
    const userDoc = await writeClient.fetch(GET_BY_ID, { userId });

    if (!userDoc) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const updatedNotifications = userDoc.notifications.map(
      (notif: { idhome: any }) => {
        if (notif.idhome === idhome) {
          return { ...notif, status: "read" };
        }
        return notif;
      }
    );

    await writeClient
      .patch(userId)
      .set({ notifications: updatedNotifications })
      .commit();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error updating notification status" }),
      { status: 500 }
    );
  }
}
