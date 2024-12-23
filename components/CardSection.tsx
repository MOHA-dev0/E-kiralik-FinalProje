import React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CardSection = () => {
  return (
    <div>
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center mb-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 rounded-full w-32 h-32 opacity-20 blur-lg"></div>

              <div className="relative z-10 text-center">
                <h2 className="text-3xl font-extrabold text-gray-800">
                  Sizin için Tasarlandı
                </h2>
                <p className="text-gray-600 mt-2">
                  Daha güvenli ve hızlı bir kiralama deneyimi için.
                </p>
              </div>
            </div>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* card 1 */}
            <Card className="relative rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Gayrimenkul Durum Tespiti
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600">
                  Gayrimenkulün durumu, teslim alma ve teslim etme aşamalarında
                  elektronik olarak kayıt altına alınır.
                </p>
              </CardContent>
            </Card>
            {/* card 2 */}
            <Card className="relative rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Ödeme Takibi
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600">
                  Kira ödemelerinizi kolayca takip edebilir, hatırlatmalar ve
                  online ödeme seçeneklerinden yararlanabilirsiniz.
                </p>
              </CardContent>
            </Card>
            {/* card 3 */}
            <Card className="relative rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Elektronik Sözleşmeler
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600">
                  Kiracı ve ev sahibi arasında güvenilir ve değiştirilemez
                  elektronik sözleşmeler oluşturulur.
                </p>
              </CardContent>
            </Card>
            {/* card 4 */}
            <Card className="relative rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Onaylı Aracılar
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600">
                  Güvenilir emlakçılar aracılığıyla, kira işlemlerinizi hızlı ve
                  sorunsuz bir şekilde tamamlayabilirsiniz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardSection;
