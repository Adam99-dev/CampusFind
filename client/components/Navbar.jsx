import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bookmark,
  GraduationCap,
  GitCompareArrows,
  Home,
  LogIn,
  LogOut,
  Menu,
  UserPlus,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const routes = [
    { name: "Home", path: "/", icon: Home },
    { name: "Colleges", path: "/colleges", icon: GraduationCap },
    { name: "Compare", path: "/compare", icon: GitCompareArrows },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const NavLink = ({ route, mobile = false }) => {
    const Icon = route.icon;
    return (
      <Link
        to={route.path}
        className={`flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 ${
          mobile ? "px-4 py-3 text-base" : "px-4 py-2 text-sm"
        } ${
          isActive(route.path)
            ? "bg-blue-50 text-blue-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
        }`}
      >
        <Icon className={mobile ? "h-5 w-5" : "h-4 w-4"} />
        {route.name}
      </Link>
    );
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-200/50 backdrop-blur-xl"
          : "border-b border-slate-100 bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src="/logo.png"
              alt="College Dekho Logo"
              className="h-11 w-auto rounded-xl object-contain"
            />
          </Link>

          <div className="hidden items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm lg:flex">
            {routes.map((route) => (
              <NavLink key={route.name} route={route} />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              {!user ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 active:scale-95"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:from-blue-700 hover:to-violet-700 active:scale-95"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/saved_colleges")}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 active:scale-95"
                    aria-label="Saved colleges"
                    title="Saved colleges"
                  >
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 active:scale-95"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-4 right-4 top-[82px] z-50 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/60 lg:hidden">
            <div className="space-y-1">
              {routes.map((route) => (
                <NavLink key={route.name} route={route} mobile />
              ))}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              {!user ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <button
                    onClick={() => navigate("/saved_colleges")}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 transition hover:bg-blue-100"
                    aria-label="Saved colleges"
                  >
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
