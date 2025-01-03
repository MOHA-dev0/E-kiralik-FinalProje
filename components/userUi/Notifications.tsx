import { useSession } from "next-auth/react";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
const Notifications = () => {
  const { data: session } = useSession();

  const [isClient, setIsClient] = useState(false);

  interface Notification {
    idhome: string;
    message: string;
    date: string;
    status: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (session) {
      const fetchNotifications = async () => {
        try {
          const data = await client.fetch(
            `*[_type == "user" && _id == $id][0].notifications`,
            { id: session.user.id }
          );
          // فلترة الإشعارات غير المقروءة فقط عند جلبها
          const unreadNotifications = (data || []).filter(
            (notif: Notification) => notif.status !== "read"
          );
          setNotifications(unreadNotifications);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
      fetchNotifications();
    }
  }, [session]);

  // دالة لإزالة الإشعار من القائمة بعد النقر على عرض العقد وتحديث حالته إلى "read"
  const handleViewContract = async (idhome: string) => {
    if (isClient && session?.user.id) {
      try {
        // إرسال طلب PATCH لتحديث حالة الإشعار إلى "read"
        const response = await fetch("/api/update-notification", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idhome,
            userId: session.user.id, // تم إرسال ID المستخدم
          }),
        });

        const result = await response.json();
        if (result.success) {
          // تحديث الإشعار في الواجهة
          setNotifications((prevNotifications) =>
            prevNotifications.filter((notif) => notif.idhome !== idhome)
          );
          // توجيه المستخدم إلى صفحة العقد
        } else {
          console.error("Failed to update notification status");
        }
      } catch (error) {
        console.error("Error updating notification status:", error);
      }
    }
  };

  return (
    <div className="fixed top-[80px] right-0 mr-[225px] w-full max-w-lg p-6 bg-white/80 rounded-xl shadow-xl backdrop-blur-md ring-1 ring-black/10 z-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Bildirimler
      </h2>
      <ul className="space-y-4 max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <li
              key={index}
              className={`p-4 rounded-xl border ${
                notif.status === "unread"
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 bg-gray-100"
              } transition-all duration-200 hover:shadow-lg hover:bg-blue-50 hover:scale-100`}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <p className="text-md font-medium text-gray-800">
                    {notif.message}
                  </p>
                  <small className="text-sm text-gray-600">
                    {new Date(notif.date).toLocaleString()}
                  </small>
                </div>
                {notif.idhome && (
                  <a
                    href={`/contract/${notif.idhome}`}
                    className="bg-blue-500 text-white text-sm px-4 py-2 rounded-xl transition-all duration-200 hover:bg-blue-600 text-center"
                    onClick={() => handleViewContract(notif.idhome)}
                  >
                    Sözleşmeyi görüntüle
                  </a>
                )}
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">
            Şu anda herhangi bir bildirim yok.
          </p>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
