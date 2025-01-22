import React from "react";

const CardSection = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center mb-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 rounded-full w-36 h-36 opacity-20 blur-2xl animate-pulse"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                  Sizin için Tasarlandı
                </h2>
                <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
                  Daha güvenli ve hızlı bir kiralama deneyimi için.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Gayrimenkul Durum Tespiti
                </h3>
                <p className="text-gray-600">
                  Gayrimenkulün durumu, teslim alma ve teslim etme aşamalarında
                  elektronik olarak kayıt altına alınır.
                </p>
              </div>
            </div>

            <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Ödeme Takibi
                </h3>
                <p className="text-gray-600">
                  Kira ödemelerinizi kolayca takip edebilir, hatırlatmalar ve
                  online ödeme seçeneklerinden yararlanabilirsiniz.
                </p>
              </div>
            </div>

            <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Elektronik Sözleşmeler
                </h3>
                <p className="text-gray-600">
                  Kiracı ve ev sahibi arasında güvenilir ve değiştirilemez
                  elektronik sözleşmeler oluşturulur.
                </p>
              </div>
            </div>

            <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Onaylı Aracılar
                </h3>
                <p className="text-gray-600">
                  Güvenilir emlakçılar aracılığıyla, kira işlemlerinizi hızlı ve
                  sorunsuz bir şekilde tamamlayabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardSection;
