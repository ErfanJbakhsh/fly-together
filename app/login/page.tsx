"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Password is required")
    .min(3, "Username must contain atleast 3 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(3, "Password must contain atleast 3 characters"),
});
type loginFormData = z.infer<typeof loginSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: loginFormData) {
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (result?.error) setError("Invalid username or password");
    else router.push("/");
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-violet-600 rounded-2xl mb-3">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">fly-together</h1>
        </div>
        {/* Form */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors
                  ${errors.username ? "border-red-500" : "border-slate-600 focus:border-violet-500"}`}
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors
                  ${errors.password ? "border-red-500" : "border-slate-600 focus:border-violet-500"}`}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-colors"
            >
              {isSubmitting ? "..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
