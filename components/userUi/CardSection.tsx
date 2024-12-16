import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { UserRoundPlus } from "lucide-react";

// Sanity
import { client } from "@/sanity/lib/client";
import { GET_OWNED_HOMES_QUERY } from "@/sanity/lib/queries";

const CardSection = () => {
  const params = useParams(); // Get dynamic route parameter
  interface Home {
    _id: string;
    owner_id?: {
      username: string;
    };
    location: string;
  }

  const [ownedHomes, setOwnedHomes] = useState<Home[]>([]);

  useEffect(() => {
    // Fetch the homes
    const fetchHomes = async () => {
      const data = await client.fetch(GET_OWNED_HOMES_QUERY, {
        owner: params.id,
      });

      setOwnedHomes(data);
    };
    fetchHomes();
  }, [params.id]); // Add params.id as a dependency to re-fetch when the param changes

  return (
    <>
      {ownedHomes?.length ? (
        ownedHomes.map((home) => (
          <div className="relative ml-4 md:ml-12 lg:ml-22" key={home._id}>
            <Card className="w-[350px]">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{home.owner_id?.username}</CardTitle>
                <CardDescription>{home.location}</CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-end">
                <UserRoundPlus />
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <p>No home</p>
      )}
    </>
  );
};

export default CardSection;
