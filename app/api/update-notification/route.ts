// app/api/update-notification/route.ts
import { writeClient } from "@/sanity/lib/write-clinet";

export async function PATCH(req: Request) {
  const { idhome, userId } = await req.json(); // استلام البيانات من الطلب

  try {
    // جلب مستند المستخدم الحالي
    const userDoc = await writeClient.fetch("*[_id == $userId][0]", { userId });

    if (!userDoc) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // تحديث الإشعار في قائمة الإشعارات
    const updatedNotifications = userDoc.notifications.map(
      (notif: { idhome: any }) => {
        if (notif.idhome === idhome) {
          return { ...notif, status: "read" }; // تحديث حالة الإشعار
        }
        return notif;
      }
    );

    // تطبيق التحديث على مستند المستخدم
    await writeClient
      .patch(userId)
      .set({ notifications: updatedNotifications }) // تعيين الإشعارات المحدثة
      .commit(); // تنفيذ العملية

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error updating notification status" }),
      { status: 500 }
    );
  }
}
