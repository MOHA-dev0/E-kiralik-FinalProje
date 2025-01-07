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

  const handleViewContract = async (idhome: string) => {
    if (isClient && session?.user.id) {
      try {
        const response = await fetch("/api/update-notification", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idhome,
            userId: session.user.id,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setNotifications((prevNotifications) =>
            prevNotifications.filter((notif) => notif.idhome !== idhome)
          );
        } else {
          console.error("Failed to update notification status");
        }
      } catch (error) {
        console.error("Error updating notification status:", error);
      }
    }
  };

  return (
    <div className="absolute top-24 right-0 w-full max-w-sm p-5 bg-white rounded-xl shadow-lg backdrop-blur-md ring-1 ring-gray-200 z-50">
      <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Bildirimler
      </h2>
      <ul className="space-y-4 max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <li
              key={index}
              className={`p-4 rounded-xl border ${
                notif.status === "unread"
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-200 bg-gray-50"
              } transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-800">
                    {notif.message}
                  </p>
                  <small className="text-xs text-gray-500">
                    {new Date(notif.date).toLocaleString()}
                  </small>
                </div>
                {notif.idhome && (
                  <a
                    href={`/contract/${notif.idhome}`}
                    className="bg-blue-500 text-white text-xs px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-600"
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
