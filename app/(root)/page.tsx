import CardSection from "@/components/CardSection";
import SecondSection from "@/components/SecondSection";

export default function Home() {
  return (
    <>
      <section className="w-full bg-gradient-to-r from-blue-500 to-green-400 min-h-[530px] flex justify-center items-center flex-col py-20 px-6 mb-16 relative">
        <div className="relative bg-black bg-opacity-50 p-6 rounded-lg shadow-md mx-3">
          <h1 className="uppercase font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center relative z-10">
            E-Kiralık: Kiracılar ve Ev Sahipleri için Güvenli Elektronik
            Sözleşme
          </h1>
        </div>
        <p className="font-medium text-[16px] sm:text-[18px] text-white max-w-3xl text-center mt-5">
          E-Kiralık platformu, ev sahipleri ve kiracılar arasında
          anlaşmazlıkları ortadan kaldırarak، işlem süreçlerini daha şeffaf ve
          güvenilir hale getirir.
        </p>

        <div className="absolute bottom-[-30px] bg-white px-6 py-3 rounded-lg shadow-md text-green-900 text-3xl font-semibold">
          Neden E-Kiralık?
        </div>
      </section>
      <CardSection />
      <SecondSection />
      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-blue-500 to-green-400 py-8 mt-10">
        <div className="max-w-6xl mx-auto text-center text-white">
          <p className="font-medium text-sm sm:text-lg">
            &copy; 2024 E-Kiralık | Tüm Hakları Saklıdır
          </p>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-200">
              Hakkında
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              İletişim
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              Gizlilik Politikası
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
