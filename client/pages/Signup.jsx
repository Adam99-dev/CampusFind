import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bookmark,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  Scale,
  TrendingUp,
  User,
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
    title: "Get personalized recommendations",
    text: "Find the best colleges based on your profile.",
    icon: TrendingUp,
    className: "bg-blue-100 text-blue-600",
  },
  {
    title: "Ask, connect and grow",
    text: "Join discussions and get student answers.",
    icon: MessageSquare,
    className: "bg-sky-100 text-sky-600",
  },
];

const passwordRules = [
  "At least 8 characters",
  "One uppercase letter",
  "One lowercase letter",
  "One number or special character",
];

const Signup = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      toast.success(data.message);
      loginUser(data.user);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Signup failed");
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
              Join CollegeDekho
            </span>
            <h1 className="mt-8 max-w-lg text-4xl font-extrabold leading-tight sm:text-5xl">
              Start your journey to the
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                {" "}
                right college
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
              Create your account and get access to personalized recommendations,
              save colleges, compare and much more.
            </p>

            <div className="mt-8 space-y-5">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.className}`}>
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

          <div className="mt-8 flex-1 rounded-[32px] border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 p-3 sm:mt-10">
            <div className="flex h-52 items-center justify-center rounded-[26px] bg-white/60 text-center text-sm font-semibold text-blue-500 sm:h-64 lg:h-full lg:min-h-64">
              Add your auth illustration image here
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

          <h2 className="text-3xl font-extrabold text-slate-950">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign up to continue to CollegeDekho
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            <label className="flex h-14 items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 text-slate-500 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
              <User className="h-5 w-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-500"
                placeholder="Full Name"
              />
            </label>

            <label className="flex h-14 items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 text-slate-500 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
              <Mail className="h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-500"
                placeholder="Email Address"
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
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-slate-500 transition hover:text-blue-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </label>

            <div>
              <p className="text-sm text-slate-600">
                Password must be at least 8 characters long
              </p>
              <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                {passwordRules.map((rule) => (
                  <span key={rule} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    {rule}
                  </span>
                ))}
              </div>
            </div>

            <label className="flex h-14 items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 text-slate-500 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
              <Lock className="h-5 w-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-500"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="text-slate-500 transition hover:text-blue-600"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </label>

            <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded accent-blue-600"
                defaultChecked
              />
              <span>
                I agree to the{" "}
                <a href="#" className="font-semibold text-blue-700 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-blue-700 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              disabled={loading}
              className="h-14 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-violet-700 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Signing up..." : "Sign Up"}
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
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-blue-700 hover:underline">
              Login
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Signup;

