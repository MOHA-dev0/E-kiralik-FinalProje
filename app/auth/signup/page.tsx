// app/auth/signup/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    tc: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // لمنع إعادة تحميل الصفحة
    const response = await fetch("/api/auth/signup", {
      method: "POST", // يجب أن يكون هنا POST وليس GET
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // إرسال بيانات التسجيل في الجسم
    });

    if (response.ok) {
      router.push("/auth/signin"); // بعد التسجيل، إعادة التوجيه إلى صفحة تسجيل الدخول
    } else {
      const data = await response.json();
      setError(data.error || "حدث خطأ في التسجيل");
    }
  };

  return (
    <div className="container max-w-lg mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Yeni Hesap Oluştur
      </h1>
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Kullanıcı Adı
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-Posta
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Şifre
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tc"
            className="block text-sm font-medium text-gray-700"
          >
            TC Kimlik Numarası
          </label>
          <input
            id="tc"
            type="text"
            name="tc"
            value={formData.tc}
            onChange={handleChange}
            required
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Hesap Oluştur
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
