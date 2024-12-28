import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRoundPlus, ShieldAlert } from "lucide-react";

// Sanity import
import { client } from "@/sanity/lib/client";
import {
  GET_OWNED_HOMES_QUERY,
  GET_RENTED_HOMES_QUERY,
} from "@/sanity/lib/queries";
import { useSession } from "next-auth/react";

// استيراد النموذج
import ESozlesmeForm from "@/components/userUi/EsozlesmseForm";

const CardSection = () => {
  const params = useParams(); // Get dynamic route parameter
  const { data: session } = useSession();
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false); // حالة لعرض الـ modal
  const [selectedHomeId, setSelectedHomeId] = useState<string | null>(null);

  interface Home {
    _id: string;
    owner_id?: {
      username: string;
    };
    tenant_id?: {
      username: string;
    };
    location: string;
  }

  useEffect(() => {
    const fetchHomes = async () => {
      if (session?.user.isLandlord) {
        // إذا كان المستخدم صاحب بيوت، جلب جميع البيوت التي يملكها
        const data = await client.fetch(GET_OWNED_HOMES_QUERY, {
          owner: params.id,
        });
        setHomes(data);
      } else {
        // إذا كان المستخدم مستأجر، جلب البيوت التي هو مستأجر فيها
        const data = await client.fetch(GET_RENTED_HOMES_QUERY, {
          tenant_id: session?.user.tc, // أو يمكنك استخدام session?.user.username حسب الحالة
        });
        setHomes(data);
        console.log("Fetched Tenant Homes:", data);
      }
      setLoading(false); // إيقاف التحميل
    };

    if (session) {
      fetchHomes();
    }
  }, [params.id, session]);

  const handleShowModal = (id: string) => {
    console.log("Selected Home ID:", id);
    setSelectedHomeId(id);
    setShowModal(true); // عند الضغط على الأيقونة، إظهار الـ modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // إغلاق الـ modal
  };

  return (
    <>
      {showModal && selectedHomeId && (
        <ESozlesmeForm onClose={handleCloseModal} homeId={selectedHomeId} />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : homes.length ? (
        <div className="flex flex-wrap gap-4 justify-start">
          {" "}
          {/* Flexbox مع تباعد بين الكروت */}
          {homes.map((home) => (
            <div className="w-full sm:w-[350px]" key={home._id}>
              {" "}
              {/* ضبط العرض على الشاشات الصغيرة والكبيرة */}
              <Card className="w-full">
                <CardHeader className="flex flex-col justify-between items-center">
                  <CardTitle>
                    {session?.user.isLandlord
                      ? home.tenant_id
                        ? `kiraci: ${home.tenant_id.username}` // عرض اسم المستأجر
                        : "No Tenant"
                      : `ev sahbi: ${home.owner_id?.username || "No Owner"}`}
                  </CardTitle>
                  <CardDescription>{home.location}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  {session?.user.isLandlord ? (
                    home.tenant_id ? (
                      <ShieldAlert className="text-red-500" size={24} /> // إذا كان البيت مستأجرًا
                    ) : (
                      <UserRoundPlus
                        className="text-green-500 cursor-pointer"
                        size={24}
                        onClick={() => handleShowModal(home._id)} // إظهار الـ modal عند الضغط
                      />
                    )
                  ) : (
                    <ShieldAlert className="text-red-500" size={24} /> // يظهر دائمًا ShieldAlert للمستأجر
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p>No Ev</p>
      )}
    </>
  );
};

export default CardSection;
