import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

//sanity
import { client } from "@/sanity/lib/client";
import { GET_NOTIFICATIONS_BY_USER_ID } from "@/sanity/lib/queries";

const Notifications = ({
  setNotificationCount,
}: {
  setNotificationCount: (count: number) => void;
}) => {
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
          const data = await client.fetch(GET_NOTIFICATIONS_BY_USER_ID, {
            id: session.user.id,
          });
          const unreadNotifications = (data || []).filter(
            (notif: Notification) => notif.status !== "read"
          );
          setNotificationCount(unreadNotifications.length);
          setNotifications(unreadNotifications);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
      fetchNotifications();
    }
  }, [session, setNotificationCount]);

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
    <div className="absolute top-24 right-14 w-full max-w-sm sm:max-w-xs p-5 bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl ring-1 ring-white/20 z-50">
      <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-4 text-center">
        Bildirimler
      </h2>
      <ul className="space-y-4 max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <li
              key={index}
              className={`p-4 rounded-xl backdrop-blur-sm ${
                notif.status === "unread"
                  ? "bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 shadow-lg"
                  : "bg-white/80 border border-gray-200"
              } transition-all duration-300 hover:shadow-xl`}
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
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs px-3 py-2 rounded-md transition-all duration-300 hover:from-blue-600 hover:to-green-600 shadow-md hover:shadow-lg"
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
