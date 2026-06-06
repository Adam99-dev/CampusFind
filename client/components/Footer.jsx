import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Building2,
  GraduationCap,
  Mail,
  MapPin,
  Scale,
  Sparkles,
  Copyright
} from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Colleges", path: "/colleges" },
    { label: "Compare", path: "/compare" },
    { label: "Rankings", path: "/rankings" },
    { label: "Courses", path: "/courses" },
  ],
  Company: [
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
    { label: "Blog", path: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
  ],
};

const highlights = [
  { label: "5,000+ Colleges", icon: Building2 },
  { label: "30,000+ Courses", icon: BookOpen },
  { label: "Smart Compare", icon: Scale },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img
                src="/logo.png"
                alt="College Dekho Logo"
                className="h-12 w-auto rounded-xl object-contain"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              Simplifying college discovery across India with accurate college
              data, comparison tools, rankings, fees and course insights.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Stay ahead in your college search
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Get updates about colleges, fees, rankings and admissions.
                </p>
              </div>
            </div>

            <form className="mt-5 flex flex-col gap-3 sm:flex-row">
              <label className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="min-w-0 flex-1 bg-transparent text-slate-950 outline-none placeholder:text-slate-400"
                />
              </label>
              <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:from-blue-700 hover:to-violet-700 active:scale-95">
                Join
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-slate-200 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-950">
              India Focused
            </h4>
            <div className="mt-4 flex items-start gap-3 text-sm leading-6 text-slate-600">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              Explore colleges, cities, courses and admission paths across
              India.
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-blue-700">
              <GraduationCap className="h-5 w-5" />
              Built for students
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold uppercase tracking-wide text-slate-950">
                {title}
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="transition hover:text-blue-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <Copyright className="w-5 h-5" /><p className="mr-191"> 2026 CampusFind. All Rights Reserved.</p>
          <p>Made for students in India.</p>
        </div>
      </div>
    </footer>
  );
}
