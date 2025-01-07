"use client";
import { useSession } from "next-auth/react";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { GET_ECONTRACTS_BY_HOMEID_QUERY } from "@/sanity/lib/queries";
import { X } from "lucide-react";

interface ContractDetailsProps {
  id: string; // ID الخاص بالسجل
  onClose: () => void; // دالة لإغلاق المودال
}

const ContractDetails: React.FC<ContractDetailsProps> = ({ id, onClose }) => {
  const { data: session } = useSession();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (id && session) {
      const fetchContract = async () => {
        try {
          const data = await client.fetch(GET_ECONTRACTS_BY_HOMEID_QUERY, {
            id,
          });
          console.log("Fetched Contract Data:", data);
          setContract(data[0]); // استخدام العنصر الأول من المصفوفة
        } catch (error) {
          console.error("Error fetching contract data:", error);
        }
      };

      fetchContract();
    }
  }, [id, session]);

  if (!contract)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative inline-flex">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full absolute top-0 left-0 animate-ping"></div>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-80 shadow-2xl rounded-xl max-w-full sm:max-w-3xl w-full p-4 sm:p-8 relative border-4 border-black">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6 sm:mb-8">
          E-Sözleşme
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              malik Kimliği
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm">
              {contract?.owner_id?.tc}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giriş Tarihi
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm">
              {contract?.girisTarihi}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kira Tutarı
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm">
              {contract?.kiraTutari}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Komisyon Tutarı
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm">
              {contract?.komisyonTutari}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sözleşme Süresi (ay)
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm">
              {contract?.sozlesmeSuresi}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ev Eşyalı mı?
            </label>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm">
              {contract?.evEsyaliMi ? "evet" : "hayır"}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anlaşma Koşulları
          </label>
          <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm">
            {contract?.anlasmaKosullari}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
