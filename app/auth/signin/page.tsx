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
      // If there is an error
      setError("Invalid TC or password.");
    } else if (res?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="container max-w-lg mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="tc"
            className="block text-sm font-medium text-gray-700"
          >
            TC Number
          </label>
          <input
            id="tc"
            type="text"
            value={tc}
            onChange={(e) => setTc(e.target.value)}
            required
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
