"use client";
import { useSession } from "next-auth/react";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // استخدم useParams للحصول على المعلمات من الرابط
import ShinyButton from "@/components/ui/shiny-button";
import { GET_ECONTRACTS_QUERY } from "@/sanity/lib/queries";
import { Checkbox } from "@/components/ui/checkbox";

const ContractDetails = () => {
  const { data: session } = useSession();
  const [contract, setContract] = useState<any>(null);
  const { id } = useParams(); // استخدام useParams بدلاً من useRouter للحصول على الـ id من الرابط

  useEffect(() => {
    if (id && session) {
      const fetchContract = async () => {
        const data = await client.fetch(GET_ECONTRACTS_QUERY, { id });
        setContract(data);
      };

      fetchContract();
    }
  }, [id, session]);

  if (!contract) return <div>Loading...</div>;

  function handleClicked() {
    const click =
      "text-white bg-white px-5 py-5 w-[200px] flex justify-center items-center mx-auto mt-8 disabled:cursor-not-allowed disabled:opacity-50";

    return;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-80 shadow-2xl rounded-xl max-w-full sm:max-w-3xl w-full p-4 sm:p-8 relative border-4 border-black ">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6 sm:mb-8">
          E-Sözleşme
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              malik Kimliği
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              {contract?.owner_id?.tc}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giriş Tarihi
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              {contract?.girisTarihi}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kira Tutarı
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              {contract?.kiraTutari}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Komisyon Tutarı
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              {contract?.komisyonTutari}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sözleşme Süresi (ay)
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              {contract?.sozlesmeSuresi}{" "}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ev Eşyalı mı?
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              {contract?.evEsyaliMi ? "evet" : "hayır"}
            </div>
          </div>
        </div>

        {/* textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anlaşma Koşulları
          </label>
          <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            {contract?.anlasmaKosullari}
          </div>
        </div>

        <div className="mt-4 mx-auto items-top flex space-x-2">
          <Checkbox />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none "
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        <ShinyButton
          disabled
          type="submit"
          className="text-white bg-white px-5 py-5 w-[200px] flex justify-center items-center mx-auto mt-8 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Kabul Ediyourum
        </ShinyButton>
      </div>
    </div>
  );
};

export default ContractDetails;
