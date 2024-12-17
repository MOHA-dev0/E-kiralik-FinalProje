import React, { useState } from "react";

const ESozlesmeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    kiraciKimligi: "",
    girisTarihi: "",
    kiraTutari: "",
    komisyonTutari: "",
    sozlesmeSuresi: "",
    evEsyaliMi: "",
    anlasmaKosullari: "",
  });

  const [showModal, setShowModal] = useState(true); // حالة لعرض المودال

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const handleClose = () => {
    setShowModal(false); // إخفاء المودال عند الضغط على زر الإغلاق
  };

  if (!showModal) return null; // إذا كانت الحالة false، لا يتم عرض المودال

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      {/* المودال */}
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6 relative">
        {/* زر الإغلاق */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={handleClose} // إغلاق المودال عند الضغط
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          E-Sözleşme
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* استخدام Flexbox لتوزيع العناصر */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">Kiracı Kimliği</label>
              <input
                type="text"
                name="kiraciKimligi"
                value={formData.kiraciKimligi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Giriş Tarihi</label>
              <input
                type="date"
                name="girisTarihi"
                value={formData.girisTarihi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Kira Tutarı</label>
              <input
                type="number"
                name="kiraTutari"
                value={formData.kiraTutari}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">
                Komisyon Tutarı
              </label>
              <input
                type="number"
                name="komisyonTutari"
                value={formData.komisyonTutari}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">
                Sözleşme Süresi (ay)
              </label>
              <input
                type="number"
                name="sozlesmeSuresi"
                value={formData.sozlesmeSuresi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Ev Eşyalı mı?</label>
              <input
                type="text"
                name="evEsyaliMi"
                placeholder="Evet / Hayır"
                value={formData.evEsyaliMi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              Anlaşma Koşulları
            </label>
            <textarea
              name="anlasmaKosullari"
              value={formData.anlasmaKosullari}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition duration-200"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ESozlesmeForm;
