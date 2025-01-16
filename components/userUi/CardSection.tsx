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

import { client } from "@/sanity/lib/client";
import {
  GET_OWNED_HOMES_QUERY,
  GET_RENTED_HOMES_QUERY,
} from "@/sanity/lib/queries";
import { useSession } from "next-auth/react";

import ESozlesmeForm from "@/components/userUi/EsozlesmseForm";
import ContractDetails from "@/components/userUi/ContractDetails";

const CardSection = () => {
  const params = useParams();
  const { data: session } = useSession();
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [showModalDetails, setShowModalDetails] = useState<boolean>(false);
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
        const data = await client.fetch(GET_OWNED_HOMES_QUERY, {
          owner: params.id,
        });
        setHomes(data);
      } else {
        const data = await client.fetch(GET_RENTED_HOMES_QUERY, {
          tenant_id: session?.user.tc,
        });
        setHomes(data);
        console.log("Fetched Tenant Homes:", data);
      }
      setLoading(false);
    };

    if (session) {
      fetchHomes();
    }
  }, [params.id, session]);

  const handleShowModalForm = (id: string) => {
    setSelectedHomeId(id);
    setShowModalForm(true);
  };

  const handleShowModalDetails = (id: string) => {
    setSelectedHomeId(id);
    setShowModalDetails(true);
  };

  const handleCloseModal = () => {
    setShowModalForm(false);
    setShowModalDetails(false);
  };

  return (
    <>
      {showModalForm && selectedHomeId && (
        <ESozlesmeForm onClose={handleCloseModal} homeId={selectedHomeId} />
      )}

      {showModalDetails && selectedHomeId && (
        <ContractDetails onClose={handleCloseModal} id={selectedHomeId} />
      )}

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative inline-flex">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
          </div>
        </div>
      ) : homes.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:ml-8 sm:ml-4">
          {homes.map((home) => (
            <div key={home._id} className="w-full">
              <Card className="w-full h-full flex flex-col justify-between bg-white/90 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/20">
                <CardHeader className="flex flex-col justify-between items-center p-4">
                  <CardTitle className="text-lg font-semibold text-gray-800 text-center">
                    {session?.user.isLandlord
                      ? home.tenant_id
                        ? `Kiracı: ${home.tenant_id.username}`
                        : "Kiracı Yok"
                      : `Ev Sahibi: ${home.owner_id?.username || "No Owner"}`}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1 text-center text-sm">
                    {home.location}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end p-4">
                  {session?.user.isLandlord ? (
                    home.tenant_id ? (
                      <ShieldAlert
                        className="text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300"
                        size={20}
                        onClick={() => handleShowModalDetails(home._id)}
                      />
                    ) : (
                      <UserRoundPlus
                        className="text-green-500 cursor-pointer hover:text-green-600 transition-colors duration-300"
                        size={20}
                        onClick={() => handleShowModalForm(home._id)}
                      />
                    )
                  ) : (
                    <ShieldAlert
                      className="text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300"
                      size={20}
                      onClick={() => handleShowModalDetails(home._id)}
                    />
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-600 text-sm">No Ev</p>
        </div>
      )}
    </>
  );
};

export default CardSection;
