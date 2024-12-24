import React, { useState } from "react";
import ShinyButton from "@/components/ui/shiny-button";
import { useSession } from "next-auth/react";
import { client } from "@/sanity/lib/client"; // Adjust the import path as necessary

interface ESozlesmeFormProps {
  onClose: () => void;
}

const ESozlesmeForm: React.FC<ESozlesmeFormProps> = ({ onClose }) => {
  const { data: session, status } = useSession(); // بيانات الجلسة مع حالة الجلسة
  const [formData, setFormData] = useState({
    kiraciKimligi: "",
    girisTarihi: "",
    kiraTutari: "",
    komisyonTutari: "",
    sozlesmeSuresi: "",
    evEsyaliMi: "",
    anlasmaKosullari: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert("Lütfen giriş yapın."); // رسالة خطأ في حال عدم وجود جلسة
      return;
    }

    // التحقق من وجود الكملك في قاعدة البيانات للحصول على id
    const kiraci = await client.fetch(`*[_type == "user" && tc == $tc][0]`, {
      tc: formData.kiraciKimligi,
    });

    if (!kiraci) {
      alert("Bu kiracının kimlik bilgileri veritabanında bulunmamaktadır.");
      return; // إيقاف عملية الحفظ إذا لم يكن الكملك موجودًا
    }

    // أخذ الـ id من بيانات المستأجر
    const kiraciId = kiraci._id;

    const contractData = {
      ...formData,
      kiraciId, // إضافة id المستأجر هنا
      owner_id: session?.user?.id || "", // إضافة معرف صاحب البيت من الجلسة
    };

    try {
      const response = await fetch("/api/eContract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      });

      if (response.ok) {
        alert("Sözleşme başarıyla kaydedildi!");
        onClose(); // إغلاق النموذج بعد الإرسال
      } else {
        console.error("Hata oluştu:", response.statusText);
        alert("Sözleşme kaydedilirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-80 shadow-2xl rounded-xl max-w-full sm:max-w-3xl w-full p-4 sm:p-8 relative border-4 border-black ">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6 sm:mb-8">
          E-Sözleşme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* الحقول */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kiracı Kimliği
              </label>
              <input
                type="text"
                name="kiraciKimligi"
                value={formData.kiraciKimligi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Kimlik bilgisi girin"
                pattern="[0-9]*"
              />
            </div>

            {/* باقي الحقول هنا كما هو موضح في الكود السابق */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giriş Tarihi
              </label>
              <input
                type="date"
                name="girisTarihi"
                value={formData.girisTarihi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kira Tutarı
              </label>
              <input
                type="number"
                name="kiraTutari"
                value={formData.kiraTutari}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Kira tutarı girin"
                pattern="[0-9]*"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Komisyon Tutarı
              </label>
              <input
                type="number"
                name="komisyonTutari"
                value={formData.komisyonTutari}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Komisyon tutarı girin"
                pattern="[0-9]*"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sözleşme Süresi (ay)
              </label>
              <input
                type="number"
                name="sozlesmeSuresi"
                value={formData.sozlesmeSuresi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ay sayısı girin"
                pattern="[0-9]*"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ev Eşyalı mı?
              </label>
              <input
                type="text"
                name="evEsyaliMi"
                placeholder="Evet / Hayır"
                value={formData.evEsyaliMi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anlaşma Koşulları
            </label>
            <textarea
              name="anlasmaKosullari"
              value={formData.anlasmaKosullari}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Koşulları girin"
            />
          </div>

          <ShinyButton
            type="submit"
            className="text-white bg-white px-5 py-5 w-[200px] flex justify-center items-center mx-auto"
          >
            Gönder
          </ShinyButton>
        </form>
      </div>
    </div>
  );
};

export default ESozlesmeForm;
