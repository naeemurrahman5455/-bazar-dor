
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { FaCartArrowDown } from "react-icons/fa";

import { Avatar, Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import MobileMenu from "./MobileMenu";

const HeaderClient = ({ date, categories = [] }) => {
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const avatarText = (user?.name || user?.email || "U")
    .trim()
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3 md:px-6">
      {/* Logo, Title and Date */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <Link
          href="/"
          aria-label="বাজার দর হোম"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#079447] to-[#04702F] text-white shadow-md shadow-green-900/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:h-14 sm:w-14"
        >
          <FaCartArrowDown size={26} />
        </Link>

        {/* Title and Date */}
        <div className="flex min-w-0 flex-col justify-center gap-1">
          <Link
            href="/"
            className="w-fit text-xl font-extrabold leading-tight tracking-tight text-[#05893E] transition-colors hover:text-[#046D31] sm:text-2xl"
          >
            বাজার দর
          </Link>

          <p className="text-xs font-semibold text-default-600 sm:text-sm">
            {date}
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Authentication */}
        {isPending ? (
          <div className="h-11 w-24 animate-pulse rounded-2xl bg-default-100" />
        ) : user ? (
          <div className="flex items-center gap-2 ">
            {/* Native Popover Trigger */}
            <button
              type="button"
              popoverTarget="bazardor-user-popover"
              style={{ anchorName: "--bazardor-user-anchor" }}
              aria-label="Open user menu"
              className="cursor-pointer  group flex h-11 min-w-0 items-center gap-2 rounded-2xl bg-content1 px-2.5 shadow-sm transition-all duration-200 hover:border-[#05893E]/30 hover:bg-success-50/70 sm:px-3"
            >
              <Avatar
                className="h-8 w-8 shrink-0 bg-[#05893E] text-xs font-bold text-white"
                showFallback
              >
                {avatarText}
              </Avatar>

              <span className="hidden max-w-32 truncate text-sm font-semibold text-default-700 sm:block">
                {user.name || "ব্যবহারকারী"}
              </span>

              <ChevronDown
                size={16}
                className="shrink-0 text-default-400 transition-transform duration-200 group-aria-expanded:rotate-180"
              />
            </button>

            {/* Native Popover Menu */}
            <div
              id="bazardor-user-popover"
              popover="auto"
              style={{
                positionAnchor: "--bazardor-user-anchor",
                position: "absolute",
                inset: "auto",
                margin: 0,
                marginTop: "8px",
                positionArea: "bottom span-right",
                positionTryFallbacks: "flip-block",
              }}
              className="w-[min(288px,calc(100vw-24px))] overflow-hidden rounded-2xl border  border-default-200/70 bg-content1 p-2 text-default-700 shadow-xl"
            >
              {/* User Information */}
              <div className="flex items-center  gap-3 rounded-xl p-3">
                <Avatar
                  className="h-11 w-11 shrink-0 bg-[#05893E] text-sm font-bold text-white"
                  showFallback
                >
                  {avatarText}
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-default-800">
                    {user.name || "ব্যবহারকারী"}
                  </p>

                  <p className="truncate text-xs text-default-400">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="my-1 h-px bg-default-200" />

              {/* My Profile */}
              <Link
                href="/profile"
                className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors hover:bg-success-50 hover:text-[#05893E]"
              >
                <UserRound size={18} />
                My Profile
              </Link>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                className="cursor-pointer flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-danger transition-colors hover:bg-danger-50"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
            
          </div>
        ) : (
          /* Guest Actions */
          <div className="flex items-center gap-2">
            <Button
              as={Link}
              href={'/sign-in'}
              variant="bordered"
              className="h-10 rounded-xl border-default-300 bg-content1 px-3.5 text-sm font-semibold transition-all duration-200 hover:border-[#05893E] hover:bg-success-50 hover:text-[#05893E] sm:px-4"
            >
            <Link href={'/sign-in'}>সাইন ইন</Link>
            </Button>

            <Button

              className="h-10 rounded-xl bg-[#05893E] px-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#047532] hover:shadow-md sm:px-4"
            >

              <Link href={'/sign-up'}>সাইন আপ</Link>

              
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default HeaderClient;
