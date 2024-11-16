"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

const SecondSection = () => {
  const [activeTab, setActiveTab] = useState(1); // حالة لتحديد المحتوى النشط

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* قسم الزخرفة أو الفصل الجمالي */}
        <div className="flex justify-center items-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 rounded-full w-80 h-80 opacity-20 blur-lg animate__animated animate__fadeIn animate__delay-1s"></div>
        </div>
        {/* أزرار التبديل */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <Button
            variant={activeTab === 1 ? "default" : "outline"}
            onClick={() => setActiveTab(1)}
            className="transition-all transform hover:scale-105 text-lg font-semibold py-3 px-6 bg-white text-gray-800 shadow-md border border-gray-300 hover:bg-gray-100"
          >
            Kiracı için
          </Button>
          <Button
            variant={activeTab === 2 ? "default" : "outline"}
            onClick={() => setActiveTab(2)}
            className="transition-all transform hover:scale-105 text-lg font-semibold py-3 px-6 bg-white text-gray-800 shadow-md border border-gray-300 hover:bg-gray-100"
          >
            Ev Sahibi için
          </Button>
        </div>
        {/* المحتوى */}

        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full transform transition-all hover:scale-105 mx-auto">
          {activeTab === 1 ? (
            <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
              {/* step 3 */}
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-200 rounded-full shadow-md animate__animated animate__fadeIn animate__delay-1s">
                  3
                </div>
                <p className="mt-4 text-center text-sm font-medium text-gray-700">
                  Tebrikler, evdeki haklarınız artık korunuyor
                </p>
              </div>
              <div className="w-16 h-px border-dashed border-t-2 border-gray-300"></div>

              {/* step 2 */}
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-200 rounded-full shadow-md animate__animated animate__fadeIn animate__delay-2s">
                  2
                </div>
                <p className="mt-4 text-center text-sm font-medium text-gray-700">
                  Elektronik sözleşme talebini kabul edin ve imzalayın
                </p>
              </div>
              <div className="w-16 h-px border-dashed border-t-2 border-gray-300"></div>

              {/* step 1 */}
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-200 rounded-full shadow-md animate__animated animate__fadeIn animate__delay-3s">
                  1
                </div>
                <p className="mt-4 text-center text-sm font-medium text-gray-700">
                  Hesap oluşturun ve ev sahibinden davetiye isteyin
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
              {/* step 3 */}
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-200 rounded-full shadow-md animate__animated animate__fadeIn animate__delay-1s">
                  3
                </div>
                <p className="mt-4 text-center text-sm font-medium text-gray-700">
                  Tebrikler, evdeki haklarınız artık korunuyor
                </p>
              </div>
              <div className="w-16 h-px border-dashed border-t-2 border-gray-300"></div>

              {/* step 2 */}
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-200 rounded-full shadow-md animate__animated animate__fadeIn animate__delay-2s">
                  2
                </div>
                <p className="mt-4 text-center text-sm font-medium text-gray-700">
                  Koşulları ve bilgileri elektronik sözleşmeye ekleyin ve
                  imzalayın
                </p>
              </div>
              <div className="w-16 h-px border-dashed border-t-2 border-gray-300"></div>

              {/* step 1 */}
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-200 rounded-full shadow-md animate__animated animate__fadeIn animate__delay-3s">
                  1
                </div>
                <p className="mt-4 text-center text-sm font-medium text-gray-700">
                  Kiracıyı, ev sahibinin sistemine eklemesi için davet gönderin
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
