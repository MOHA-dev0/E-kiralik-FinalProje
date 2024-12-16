"use client";

import CardSection from "@/components/userUi/CardSection";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";

const UserPage = () => {
  const { data: session } = useSession();
  const params = useParams(); // Get dynamic route parameter

  // Get the user ID (TC in your case)
  const userId = params.id;

  return (
    <>
      <section className="w-full bg-gradient-to-r from-blue-500 to-green-400 min-h-[530px] flex justify-center items-center flex-col py-20 px-6 mb-16 relative">
        <div className="relative bg-black bg-opacity-50 p-6 rounded-lg shadow-md mx-3">
          <h1 className="uppercase font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center relative z-10">
            Merhaba Sayin {session?.user?.username}!
          </h1>
        </div>
        <p className="font-medium text-[16px] sm:text-[18px] text-white max-w-3xl text-center mt-5">
          E-Kiralık platformu, ev sahipleri ve kiracılar arasında
          anlaşmazlıkları ortadan kaldırarak، işlem süreçlerini daha şeffaf ve
          güvenilir hale getirir.
        </p>
      </section>
      <CardSection />
    </>
  );
};

export default UserPage;
