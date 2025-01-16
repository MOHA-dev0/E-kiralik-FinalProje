"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const [tc, setTc] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      tc,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid TC or password.");
    } else if (res?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="container max-w-lg mx-auto mt-20 p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-green-400  bg-clip-text text-transparent">
        Giriş Yap
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="tc"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kimlik numarası
          </label>
          <input
            id="tc"
            type="text"
            value={tc}
            onChange={(e) => setTc(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="Enter your TC number"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="Enter your password"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center animate-pulse">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-green-500 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
