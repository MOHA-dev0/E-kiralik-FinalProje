import { useSession } from "next-auth/react";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

const Notifications = () => {
  const { data: session } = useSession();
  interface Notification {
    message: string;
    date: string;
    status: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (session) {
      const fetchNotifications = async () => {
        const data = await client.fetch(
          `*[_type == "user" && _id == $id][0].notifications`,
          { id: session.user.id }
        );
        setNotifications(data || []);
      };
      fetchNotifications();
    }
  }, [session]);

  const markAsRead = async (index: number) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].status = "read";

    if (session?.user?.id) {
      try {
        await client
          .patch(session.user.id)
          .set({ notifications: updatedNotifications })
          .commit();
        setNotifications(updatedNotifications);
      } catch (error) {
        console.error("Error updating notifications:", error);
      }
    }
  };

  return (
    <div className="notifications">
      <h2>الإشعارات</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index} className={notif.status === "unread" ? "unread" : ""}>
            <p>{notif.message}</p>
            <small>{new Date(notif.date).toLocaleString()}</small>
            {notif.status === "unread" && (
              <button onClick={() => markAsRead(index)}>تم القراءة</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
