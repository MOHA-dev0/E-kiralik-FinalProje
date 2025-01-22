"use client";

import { useSession } from "next-auth/react";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ShinyButton from "@/components/ui/shiny-button";
import { GET_ECONTRACTS_QUERY } from "@/sanity/lib/queries";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const ContractDetails = () => {
  const { data: session } = useSession();
  const { id } = useParams();
  const router = useRouter();

  const [contract, setContract] = useState<any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id && session) {
      const fetchContract = async () => {
        setIsLoading(true);
        try {
          const data = await client.fetch(GET_ECONTRACTS_QUERY, { id });
          setContract(data);
        } catch (error) {
          console.error("Error fetching contract:", error);
          alert("Sözleşme bilgileri alınırken bir hata oluştu.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchContract();
    }
  }, [id, session]);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleAcceptContract = async () => {
    if (!isChecked) {
      alert("Lütfen sözleşme şartlarını kabul edin.");
      return;
    }

    setIsLoading(true);

    try {
      if (!session?.user?.tc || !contract?._id || !contract?.home_id?._id) {
        console.error("Missing required data for contract acceptance");
        return;
      }

      const response = await fetch("/api/eContract/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kiraciKimligi: session.user.tc,
          contractId: contract._id,
          homeId: contract.home_id?._id,
        }),
      });

      const result = await response.json();
      if (response.ok && result.message) {
        alert("Sözleşme başarıyla kabul edildi.");
        router.push("/");
      } else {
        console.log("Error response:", result);
      }
    } catch (error) {
      console.error("Error during contract acceptance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!contract) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative inline-flex">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full absolute top-0 left-0 animate-ping"></div>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl max-w-full sm:max-w-3xl w-full p-6 sm:p-8 relative border border-white/20">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent text-center mb-6 sm:mb-8">
          E-Sözleşme
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Malik Kimliği
            </label>
            <div className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md">
              {contract?.owner_id?.tc}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giriş Tarihi
            </label>
            <div className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md">
              {contract?.girisTarihi}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kira Tutarı
            </label>
            <div className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md">
              {contract?.kiraTutari}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Komisyon Tutarı
            </label>
            <div className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md">
              {contract?.komisyonTutari}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sözleşme Süresi (ay)
            </label>
            <div className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md">
              {contract?.sozlesmeSuresi}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ev Eşyalı mı?
            </label>
            <div className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md">
              {contract?.evEsyaliMi ? "Evet" : "Hayır"}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anlaşma Koşulları
          </label>
          <div className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md">
            {contract?.anlasmaKosullari}
          </div>
        </div>

        <div className="mt-4 mx-auto items-top flex space-x-2">
          <Checkbox
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none"
            >
              Şartları ve koşulları kabul ediyorum
            </label>
            <p className="text-sm text-muted-foreground">
              <Link
                href="/terms-and-privacy"
                className="text-blue-500 hover:text-blue-600 underline"
              >
                Hizmet Şartları
              </Link>{" "}
              ve{" "}
              <Link
                href="/terms-and-privacy"
                className="text-blue-500 hover:text-blue-600 underline"
              >
                Gizlilik Politikası
              </Link>
              'nı kabul ediyorum.
            </p>
          </div>
        </div>

        <ShinyButton
          disabled={!isChecked || isLoading}
          onClick={handleAcceptContract}
          className="text-white bg-white px-5 py-5 w-[200px] flex justify-center items-center mx-auto mt-8 disabled:opacity-50"
        >
          {isLoading ? "İşleniyor..." : "Kabul Ediyorum"}
        </ShinyButton>
      </div>
    </div>
  );
};

export default ContractDetails;
