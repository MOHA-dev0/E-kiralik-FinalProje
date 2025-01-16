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
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/auth/signin");
    } else {
      const data = await response.json();
      setError(data.error || "Feild to create account");
    }
  };

  return (
    <div className="container max-w-lg mx-auto mt-20 p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
        Yeni Hesap Oluştur
      </h1>
      {error && (
        <p className="text-red-500 text-sm text-center mb-4 animate-pulse">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="Kullanıcı adınızı girin"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="E-posta adresinizi girin"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="Şifrenizi girin"
          />
        </div>
        <div>
          <label
            htmlFor="tc"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="TC kimlik numaranızı girin"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-green-500 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Hesap Oluştur
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
