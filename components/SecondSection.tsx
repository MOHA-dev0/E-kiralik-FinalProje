"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

const SecondSection = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center mb-12 md:mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 rounded-full w-48 h-48 md:w-80 md:h-80 opacity-20 blur-2xl animate-pulse"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Kiralama Süreci
            </h2>
            <p className="text-gray-600 mt-3 text-sm md:text-lg max-w-2xl mx-auto">
              Kiracı ve ev sahibi için hızlı, güvenli ve kolay bir kiralama
              deneyimi.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 md:mb-12">
         <Button
  variant={activeTab === 1 ? "default" : "outline"}
  onClick={() => setActiveTab(1)}
  className={`w-full sm:w-auto transition-all transform text-sm md:text-base font-semibold py-2 px-4 backdrop-blur-lg shadow-lg border 
    ${activeTab === 1 
      ? "bg-white/90 shadow-xl text-gray-900 scale-105 border-white/30" 
      : "bg-white/80 hover:bg-white/90 hover:shadow-xl hover:scale-105 text-gray-800 hover:text-gray-900 border-white/20"
    }`}
>
  Kiracı için
</Button>

<Button
  variant={activeTab === 2 ? "default" : "outline"}
  onClick={() => setActiveTab(2)}
  className={`w-full sm:w-auto transition-all transform text-sm md:text-base font-semibold py-2 px-4 backdrop-blur-lg shadow-lg border 
    ${activeTab === 2 
      ? "bg-white/90 shadow-xl text-gray-900 scale-105 border-white/30" 
      : "bg-white/80 hover:bg-white/90 hover:shadow-xl hover:scale-105 text-gray-800 hover:text-gray-900 border-white/20"
    }`}
>
  Ev Sahibi için
</Button>

        </div>

        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 md:p-8 max-w-6xl w-full transform transition-all hover:scale-105 mx-auto border border-white/20">
          {activeTab === 1 ? (
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse">
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-white/90 backdrop-blur-md border-2 border-white/30 rounded-full shadow-lg animate__animated animate__fadeIn animate__delay-1s">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    1
                  </span>
                </div>
                <p className="mt-4 text-center text-xs md:text-sm font-medium text-gray-700 max-w-[150px] md:max-w-[200px]">
                  Hesap oluşturun ve ev sahibinden davetiye isteyin
                </p>
              </div>
              <div className="w-16 h-px md:w-24 md:h-px border-dashed border-t-2 border-gray-300"></div>

              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-white/90 backdrop-blur-md border-2 border-white/30 rounded-full shadow-lg animate__animated animate__fadeIn animate__delay-2s">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    2
                  </span>
                </div>
                <p className="mt-4 text-center text-xs md:text-sm font-medium text-gray-700 max-w-[150px] md:max-w-[200px]">
                  Elektronik sözleşme talebini kabul edin ve imzalayın
                </p>
              </div>
              <div className="w-16 h-px md:w-24 md:h-px border-dashed border-t-2 border-gray-300"></div>

              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-white/90 backdrop-blur-md border-2 border-white/30 rounded-full shadow-lg animate__animated animate__fadeIn animate__delay-3s">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    3
                  </span>
                </div>
                <p className="mt-4 text-center text-xs md:text-sm font-medium text-gray-700 max-w-[150px] md:max-w-[200px]">
                  Tebrikler, evdeki haklarınız artık korunuyor
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse">
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-white/90 backdrop-blur-md border-2 border-white/30 rounded-full shadow-lg animate__animated animate__fadeIn animate__delay-1s">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    1
                  </span>
                </div>
                <p className="mt-4 text-center text-xs md:text-sm font-medium text-gray-700 max-w-[150px] md:max-w-[200px]">
                  Kiracıyı, ev sahibinin sistemine eklemesi için davet gönderin
                </p>
              </div>
              <div className="w-16 h-px md:w-24 md:h-px border-dashed border-t-2 border-gray-300"></div>

              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-white/90 backdrop-blur-md border-2 border-white/30 rounded-full shadow-lg animate__animated animate__fadeIn animate__delay-2s">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    2
                  </span>
                </div>
                <p className="mt-4 text-center text-xs md:text-sm font-medium text-gray-700 max-w-[150px] md:max-w-[200px]">
                  Koşulları ve bilgileri elektronik sözleşmeye ekleyin ve
                  imzalayın
                </p>
              </div>
              <div className="w-16 h-px md:w-24 md:h-px border-dashed border-t-2 border-gray-300"></div>

              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-white/90 backdrop-blur-md border-2 border-white/30 rounded-full shadow-lg animate__animated animate__fadeIn animate__delay-3s">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    3
                  </span>
                </div>
                <p className="mt-4 text-center text-xs md:text-sm font-medium text-gray-700 max-w-[150px] md:max-w-[200px]">
                  Tebrikler, evdeki haklarınız artık korunuyor
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
