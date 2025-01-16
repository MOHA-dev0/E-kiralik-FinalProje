import React from "react";

const TermsAndPrivacy = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Hizmet Şartları ve Gizlilik Politikası
      </h1>

      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Şartların Kabulü
          </h2>
          <p className="text-sm leading-relaxed">
            Bu platformu kullanarak, aşağıda belirtilen şart ve koşullara uymayı
            kabul etmiş sayılırsınız. Bu kabul,{" "}
            <strong>hukuki olarak bağlayıcıdır</strong> ve kira sözleşmesinde
            belirtilen sürenin sona ermesi dışında iptal edilemez veya
            feshedilemez.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Kabulün Hassasiyeti
          </h2>
          <p className="text-sm leading-relaxed">
            Şartlar ve yükümlülükler üzerindeki kabul, "Kabul Ediyorum" butonuna
            tıklanması veya hizmetin kullanılmasıyla birlikte{" "}
            <strong>kesin ve bağlayıcı</strong> hale gelir. Kiracı, kabulünden
            vazgeçemez veya sözleşmeyi feshedemez, ancak yasa tarafından
            belirlenen istisnai durumlar haricinde.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Ev Sahibinin Haklarının Korunması
          </h2>
          <p className="text-sm leading-relaxed">
            Kiracı, kira sözleşmesi boyunca kira bedelini{" "}
            <strong>tam olarak ve belirlenen tarihlerde</strong> ödemeyi taahhüt
            eder. Kiracının ödeme yapmaması durumunda, ev sahibi hukuki yollara
            başvurarak mali haklarını talep etme hakkına sahiptir. Kiracı, ev
            sahibinin yazılı onayı olmadan sözleşmeyi sonlandıramaz veya mülkü
            terk edemez.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Feshedilemezlik
          </h2>
          <p className="text-sm leading-relaxed">
            Taraflar arasında imzalanan sözleşme, yasa tarafından belirlenen
            durumlar veya tarafların karşılıklı yazılı anlaşması dışında{" "}
            <strong>feshedilemez</strong>. Sözleşmenin yasa dışı olarak
            sonlandırılması durumunda, ihlal eden taraf tüm hukuki ve mali
            sorumlulukları üstlenir.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Kişisel Verilerin Korunması
          </h2>
          <p className="text-sm leading-relaxed">
            Kişisel verileriniz, yalnızca sözleşmenin yerine getirilmesi ve
            hizmetlerin iyileştirilmesi amacıyla kullanılır. Verileriniz, üçüncü
            taraflarla paylaşılmaz ve güvenli bir şekilde saklanır.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Hukuki İşlemler
          </h2>
          <p className="text-sm leading-relaxed">
            Taraflar arasında çıkabilecek herhangi bir anlaşmazlık durumunda,
            yetkili mahkemelere başvurulacaktır. Taraflar, kira ve emlak
            hukukuna ilişkin yerel ve uluslararası yasalara uymayı kabul eder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
