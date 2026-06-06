import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Building2,
  ChevronRight,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Scale,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

const popularSearches = [
  "B.Tech",
  "MBA",
  "Engineering",
  "Delhi NCR",
  "Low Fees",
  "Top Rated",
];

const actionCards = [
  {
    title: "Explore Colleges",
    description: "Discover colleges based on courses, location, fees and more.",
    icon: Building2,
    iconClass: "bg-indigo-100 text-indigo-600",
    path: "/colleges",
  },
  {
    title: "Compare Colleges",
    description: "Compare up to 3 colleges side by side and find the best fit.",
    icon: Scale,
    iconClass: "bg-emerald-100 text-emerald-600",
    path: "/compare",
  },
  {
    title: "Predict Your College",
    description: "Use rank, rating and fees data to shortlist smarter options.",
    icon: TrendingUp,
    iconClass: "bg-blue-100 text-blue-600",
    path: "/colleges",
  },
  {
    title: "Ask & Connect",
    description: "Get answers from students, alumni and the community.",
    icon: MessageSquare,
    iconClass: "bg-sky-100 text-sky-600",
    path: "/colleges",
  },
];

const stats = [
  {
    value: "5,000+",
    label: "Colleges",
    icon: Building2,
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    value: "30,000+",
    label: "Courses",
    icon: BookOpen,
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    value: "10M+",
    label: "Reviews",
    icon: Star,
    color: "text-blue-600 bg-blue-100",
  },
  {
    value: "500K+",
    label: "Students Helped",
    icon: Users,
    color: "text-sky-600 bg-sky-100",
  },
];

const formatFees = (value) => {
  if (!value && value !== 0) return "Fees NA";
  return `Rs ${(value / 100000).toFixed(1)} L / yr`;
};

const CollegeCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="h-36 animate-pulse bg-slate-200" />
    <div className="space-y-4 p-4">
      <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200" />
      <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-200" />
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
        <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 animate-pulse rounded-full bg-slate-200" />
        <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
      </div>
    </div>
  </div>
);

export default function CollegeDataPlatform() {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [totalColleges, setTotalColleges] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        setError("");

        const query = new URLSearchParams({
          page: "1",
          limit: "4",
          sortBy: "rating",
          order: "desc",
        });

        const response = await fetch(
          `${API_BASE}/api/colleges?${query.toString()}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) throw new Error("Failed to fetch colleges");

        const data = await response.json();
        setColleges(data.colleges || []);
        setTotalColleges(data.totalColleges || 0);
      } catch (err) {
        setError(err.message || "Unable to load colleges");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 font-sans text-slate-950 sm:px-6 lg:px-8 ::-webkit-scrollbar:none">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[28px] bg-white px-5 py-10 shadow-sm ring-1 ring-slate-200 sm:px-9 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
                Find the right college
                <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  for your future
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Search, explore and compare 5,000+ colleges across India. Make
                informed decisions for a successful career.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      navigate(`/colleges?search=${encodeURIComponent(item)}`)
                    }
                    className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative hidden min-h-[300px] lg:block">
              <div className="absolute right-0 top-0 h-[315px] w-full rounded-[44%_56%_35%_65%/48%_42%_58%_52%] bg-blue-100">
                <img
                  src="./campus.png"
                  alt="campus"
                  className="object-cover absolute right-0 top-0 h-[315px] w-full rounded-[44%_56%_35%_65%/48%_42%_58%_52%]"
                />
              </div>
              <div className="absolute left-8 top-16 grid grid-cols-8 gap-3 opacity-40">
                {Array.from({ length: 64 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-blue-400"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-950">
                Top Colleges
              </h2>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                Recommended for you
              </span>
            </div>
            <Link
              to="/colleges"
              className="flex items-center gap-2 text-sm font-semibold text-blue-600"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <CollegeCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              {error}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {colleges.map((college) => (
                <Link
                  key={college.id}
                  to={`/colleges/${college.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-36 bg-slate-100">
                    {college.image ? (
                      <img
                        src={college.image}
                        alt={college.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
                        <Building2 className="h-12 w-12 text-blue-300" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-1 text-base font-bold text-slate-950">
                      {college.name}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                      {[college.city, college.state]
                        .filter(Boolean)
                        .join(", ") || "India"}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-sm text-slate-600">
                      <Star className="h-4 w-4 fill-blue-400 text-blue-400" />
                      <span className="font-semibold text-slate-900">
                        {college.rating || "N/A"}
                      </span>
                      <span>({college.totalStudents || "2.1k"} reviews)</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-600">
                        {formatFees(college.feesMin)}
                      </span>
                      <span className="rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-600">
                        Engineering
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.path}
                className="flex min-h-28 items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${card.iconClass}`}
                >
                  <Icon className="h-8 w-8" />
                </span>
                <span>
                  <span className="block font-bold text-slate-950">
                    {card.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">
                    {card.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </section>

        <section className="mt-8 grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center justify-center gap-5 lg:border-r lg:border-slate-200 last:lg:border-r-0"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${item.color}`}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <span>
                  <span className="block text-2xl font-extrabold text-slate-950">
                    {item.label === "Colleges" && totalColleges
                      ? `220+`
                      : item.value}
                  </span>
                  <span className="text-sm text-slate-600">{item.label}</span>
                </span>
              </div>
            );
          })}
        </section>

      </div>
    </main>
  );
}

