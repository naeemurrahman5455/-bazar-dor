
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  UserRound,
  LogOut,
} from "lucide-react";
import { Avatar } from "@heroui/react";

import { useSession, signOut } from "@/lib/auth-client";

const MobileMenu = ({ categories = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const avatarText = (user?.name || user?.email || "U")
    .trim()
    .slice(0, 2)
    .toUpperCase();

  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      closeMenu();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="relative md:hidden">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
          isOpen
            ? "border-[#05893E]/20 bg-success-50 text-[#05893E]"
            : "border-default-200 bg-content1 text-default-700 hover:border-[#05893E]/30 hover:text-[#05893E]"
        }`}
      >
        {isOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            onClick={closeMenu}
            className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-[2px]"
          />

          {/* Menu Panel */}
          <div
         id="mobile-navigation"
  className="absolute right-0 top-12 z-50 w-[min(320px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
>
          
            {/* User Account */}
            {!isPending && user && (
              <div className="border-b border-default-200/70 p-3">
                <div className="flex items-center gap-3 rounded-xl bg-success-50/70 p-3">
                  <Avatar
                    className="h-11 w-11 shrink-0 bg-[#05893E] text-sm font-bold text-white"
                    showFallback
                  >
                    {avatarText}
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-default-800">
                      {user.name || "ব্যবহারকারী"}
                    </p>

                    <p className="truncate text-xs text-default-500">
                      {user.email}
                    </p>

                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#05893E]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#05893E]" />
                      Logged In
                    </span>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-default-200 bg-content1 px-2 text-sm font-semibold text-default-700 transition-colors hover:border-[#05893E] hover:bg-success-50 hover:text-[#05893E]"
                  >
                    <UserRound size={16} />
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-danger-100 bg-danger-50 px-2 text-sm font-semibold text-danger transition-colors hover:bg-danger-100"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isPending && (
              <div className="flex items-center gap-3 border-b border-default-200/70 p-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-default-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-28 animate-pulse rounded bg-default-200" />
                  <div className="h-2.5 w-40 max-w-full animate-pulse rounded bg-default-100" />
                </div>
              </div>
            )}

            {/* Category Header */}
            <div className="flex items-center justify-between border-b border-default-200/70 px-4 py-3">
              <div>
                <h2 className="text-sm font-bold text-default-800">
                  ক্যাটাগরি
                </h2>

                <p className="mt-0.5 text-xs text-default-400">
                  আপনার পছন্দের বাজারদর দেখুন
                </p>
              </div>

          
            </div>

            {/* Category Links */}
            <div className="max-h-[45vh] overflow-y-auto p-3">
              <div className="grid gap-1.5">
                {categories.map((item, index) => (
                  <Link
                    href={`/category/${item.slug}`}
                    key={item.id ?? item.slug ?? index}
                    onClick={closeMenu}
                    className="group flex min-h-11 items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-default-700 transition-all duration-200 hover:border-success-100 hover:bg-success-50 hover:text-[#05893E]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-default-100 text-lg transition-colors group-hover:bg-white">
                      {item.icon || "🛒"}
                    </span>

                    <span className="min-w-0 flex-1 truncate">
                      {item.nameBn ||
                        item.title ||
                        item.name ||
                        item.slug}
                    </span>

                    <ChevronRight
                      size={16}
                      className="shrink-0 text-default-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#05893E]"
                    />
                  </Link>
                ))}

                {categories.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-default-400">
                    কোনো ক্যাটাগরি পাওয়া যায়নি।
                  </p>
                )}
              </div>
            </div>

            {/* Guest Authentication */}
            {!isPending && !user && (
              <div className="border-t border-default-200/70 bg-default-50/50 p-3">
                <p className="mb-3 text-center text-xs text-default-500">
                  আপনার অ্যাকাউন্টে প্রবেশ করুন অথবা নতুন অ্যাকাউন্ট তৈরি করুন
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/sign-in"
                    onClick={closeMenu}
                    className="flex h-11 items-center justify-center rounded-xl border border-default-200 bg-content1 px-3 text-sm font-semibold text-default-700 transition-colors hover:border-[#05893E] hover:bg-success-50 hover:text-[#05893E]"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={closeMenu}
                    className="flex h-11 items-center justify-center rounded-xl bg-[#05893E] px-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#047532] hover:shadow-md"
                  >
                    সাইন আপ
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
