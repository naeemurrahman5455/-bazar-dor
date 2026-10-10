"use client";

import { signIn } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { toast } from "react-toastify";

const SignInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const { data: resData, error } = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে!");
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে!");
    } catch (error) {
      toast.error(error.message || "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const handelGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
      });
    } catch (error) {
      toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি।");
    }
  };

  const handelGitHubSignIn = async () => {
    try {
      await signIn.social({
        provider: "github",
      });
    } catch (error) {
      toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি।");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#ebf1eb] px-4 py-12 sm:px-6">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#05893E]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#05893E]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-md">
        {/* Heading */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
          >
            <span className="text-2xl">🛒</span>
            <span className="text-xl font-extrabold tracking-tight text-[#05893E]">
              বাজার দর
            </span>
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            সাইন ইন
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600 sm:text-base">
           বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign In Card */}
        <div className="rounded-3xl border border-white/80 bg-[#FAFCFA] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-9">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              সাইন ইন করুন
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য দিন।
            </p>
          </div>

          {/* Email and Password Form */}
          <Form
            className="flex w-full flex-col gap-5"
            onSubmit={onSubmit}
          >
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
              className="w-full"
            >
              <Label className="mb-2 block text-sm font-semibold text-gray-700">
                ইমেইল ঠিকানা
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 shadow-sm outline-none transition focus-within:border-[#05893E] focus-within:ring-2 focus-within:ring-[#05893E]/10"
              />

              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                return null;
              }}
              className="w-full"
            >
              <Label className="mb-2 block text-sm font-semibold text-gray-700">
                পাসওয়ার্ড
              </Label>

              <Input
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 shadow-sm outline-none transition focus-within:border-[#05893E] focus-within:ring-2 focus-within:ring-[#05893E]/10"
              />

              <Description className="mt-2 text-xs leading-5 text-gray-500">
                কমপক্ষে ৮ অক্ষর, একটি বড় হাতের ইংরেজি অক্ষর ও একটি সংখ্যা
                থাকতে হবে।
              </Description>

              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <Button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#05893E] px-4 text-sm font-bold text-white shadow-md shadow-[#05893E]/20 transition-all hover:-translate-y-0.5 hover:bg-[#047532] hover:shadow-lg hover:shadow-[#05893E]/20"
            >
              <Check />
              সাইন ইন করুন
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              অথবা
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Authentication */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              onClick={handelGoogleSignIn}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.75 3.27-8.1Z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.99 7.28-2.65l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.15A11 11 0 0 0 1 12c0 1.78.43 3.46 1.15 4.95l3.69-2.84Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.02 14.97 1 12 1a11 11 0 0 0-9.85 6.05l3.69 2.84C6.71 7.29 9.14 5.36 12 5.36Z"
                />
              </svg>
              Google
            </Button>

            <Button
              type="button"
              onClick={handelGitHubSignIn}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 fill-current"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.68-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.59 1.2 3.22.92.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.62 5.23-5.11 5.51.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.53A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-7 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-[#05893E] underline-offset-4 transition hover:text-[#047532] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
          
        </div>


      </div>
    </div>
  );
};

export default SignInPage;

