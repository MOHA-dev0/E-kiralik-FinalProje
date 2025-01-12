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
        <div className="flex flex-wrap gap-4 justify-start lg:ml-9 sm:ml-3 ">
          {homes.map((home) => (
            <div className="w-full sm:w-[350px]" key={home._id}>
              <Card className="w-full">
                <CardHeader className="flex flex-col justify-between items-center">
                  <CardTitle>
                    {session?.user.isLandlord
                      ? home.tenant_id
                        ? `kiraci: ${home.tenant_id.username}`
                        : "hiçbir kiraci yoktur"
                      : `ev sahbi: ${home.owner_id?.username || "No Owner"}`}
                  </CardTitle>
                  <CardDescription>{home.location}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  {session?.user.isLandlord ? (
                    home.tenant_id ? (
                      <ShieldAlert
                        className="text-red-500 cursor-pointer"
                        size={24}
                        onClick={() => handleShowModalDetails(home._id)}
                      />
                    ) : (
                      <UserRoundPlus
                        className="text-green-500 cursor-pointer"
                        size={24}
                        onClick={() => handleShowModalForm(home._id)}
                      />
                    )
                  ) : (
                    <ShieldAlert
                      className="text-red-500 cursor-pointer"
                      size={24}
                      onClick={() => handleShowModalDetails(home._id)}
                    />
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
