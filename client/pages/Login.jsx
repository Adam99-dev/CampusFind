import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bookmark,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  Scale,
  TrendingUp,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const benefits = [
  {
    title: "Save your favorite colleges",
    text: "Keep track of colleges you like.",
    icon: Bookmark,
    className: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Compare and decide",
    text: "Compare up to 3 colleges side by side.",
    icon: Scale,
    className: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Personalized recommendations",
    text: "Find the best colleges based on your goals.",
    icon: TrendingUp,
    className: "bg-blue-100 text-blue-600",
  },
  {
    title: "Ask, connect and grow",
    text: "Get answers from students and alumni.",
    icon: MessageSquare,
    className: "bg-sky-100 text-sky-600",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      toast.success(data.message);
      loginUser(data.user);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1fr]">
        <section className="flex min-h-full flex-col overflow-hidden rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="shrink-0">
            <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
              Welcome back
            </span>
            <h1 className="mt-8 max-w-lg text-4xl font-extrabold leading-tight sm:text-5xl">
              Continue your journey to the
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                {" "}
                right college
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
              Login to access saved colleges, compare lists and personalized
              recommendations.
            </p>

            <div className="mt-8 space-y-5">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.className}`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-bold text-slate-950">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm text-slate-600">
                        {item.text}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex-1 rounded-[32px] p-3 sm:mt-10">
            <div className="h-52 overflow-hidden rounded-[26px] sm:h-64 lg:h-full lg:min-h-64">
              <img
                src="./login.png"
                alt="Campus illustration"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/640x360?text=Campus+Image";
                }}
              />
            </div>
          </div>
        </section>

        <section className="relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8 lg:p-12">
          <button
            onClick={() => navigate("/")}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold text-slate-950">
              Login to your account
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Continue to CollegeDekho
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <label className="flex h-14 items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 text-slate-500 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
              <Mail className="h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-500"
                placeholder="Email Address"
                required
              />
            </label>

            <label className="flex h-14 items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 text-slate-500 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
              <Lock className="h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-500"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-slate-500 transition hover:text-blue-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </label>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                Remember me
              </label>
              <a
                href="#"
                className="font-semibold text-blue-700 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              disabled={loading}
              className="h-14 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-violet-700 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4 text-sm text-slate-500">
            <span className="h-px flex-1 bg-slate-200" />
            or continue with
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button className="flex h-12 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
              <img
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>
            <button className="flex h-12 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
              Continue with Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-blue-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;

