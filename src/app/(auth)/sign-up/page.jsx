

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { toast } from "react-toastify";
import { signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const passwordValue = formData.get("password")?.toString() ?? "";
    const confirmPassword =
      formData.get("confirmPassword")?.toString() ?? "";

    if (passwordValue !== confirmPassword) {
      toast.error("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!");
      return;
    }

    try {
      const { error } = await signUp.email({
        name,
        email,
        password: passwordValue,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "অ্যাকাউন্ট তৈরি করা যায়নি!",
      );
    }
  };

  const onReset = () => {
    setPassword("");
    toast.info("ফর্ম রিসেট করা হয়েছে!");
  };

  const handelSignInWithGoogle = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি!");
      }
    } catch {
      toast.error("Google দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  const handelSigInwithGitHub = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি!");
      }
    } catch {
      toast.error("GitHub দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#ebf1eb] px-4 py-10 sm:px-6 sm:py-14">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-emerald-300/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 -z-10 h-96 w-96 rounded-full bg-green-400/20 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-[100px]" />

      <div className="w-full max-w-[460px]">
        {/* Brand */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2.5"
          aria-label="বাজার দর হোম"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
            <Check className="h-6 w-6" />
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-gray-900">
            বাজার <span className="text-emerald-700">দর</span>
          </span>
        </Link>

        {/* Signup Card */}
        <div className="overflow-hidden rounded-[28px] border border-white/80 bg-[#FAFCFA]/95 shadow-[0_30px_100px_-30px_rgba(16,64,39,0.24)] backdrop-blur-xl">
          {/* Card Header */}
          <div className="px-5 pb-2 pt-8 text-center sm:px-9 sm:pt-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7 text-emerald-700"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 15 2 2 4-4"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              বাজারের প্রতিদিনের দামের আপডেট পেতে আপনার নতুন অ্যাকাউন্ট তৈরি
              করুন।
            </p>
          </div>

          {/* Form */}
          <div className="px-5 pb-7 pt-6 sm:px-9 sm:pb-9">
            <Form
              onSubmit={onSubmit}
              onReset={onReset}
              className="flex flex-col gap-5"
            >
              {/* Name */}
              <TextField
                name="name"
                isRequired
                validate={(value) => {
                  if (!value.trim()) {
                    return "আপনার নাম লিখুন।";
                  }

                  if (value.trim().length < 3) {
                    return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";
                  }

                  return null;
                }}
                className="flex flex-col gap-2"
              >
                <Label className="text-sm font-semibold text-gray-800">
                  আপনার নাম
                </Label>

                <Input
                  name="name"
                  type="text"
                  placeholder="আপনার পুরো নাম লিখুন"
                  autoComplete="name"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 shadow-sm outline-none transition duration-200 placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />

                <FieldError className="text-xs text-red-600" />
              </TextField>

              {/* Email */}
              <TextField
                name="email"
                isRequired
                validate={(value) => {
                  if (!value.trim()) {
                    return "আপনার ইমেইল লিখুন।";
                  }

                  if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ) {
                    return "সঠিক ইমেইল ঠিকানা লিখুন।";
                  }

                  return null;
                }}
                className="flex flex-col gap-2"
              >
                <Label className="text-sm font-semibold text-gray-800">
                  ইমেইল অ্যাড্রেস
                </Label>

                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 shadow-sm outline-none transition duration-200 placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />

                <FieldError className="text-xs text-red-600" />
              </TextField>

              {/* Password */}
              <TextField
                name="password"
                isRequired
                validate={(value) => {
                  if (!value) {
                    return "একটি পাসওয়ার্ড লিখুন।";
                  }

                  if (value.length < 8) {
                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
                  }

                  if (!/[A-Z]/.test(value)) {
                    return "অন্তত একটি বড় হাতের ইংরেজি অক্ষর থাকতে হবে।";
                  }

                  if (!/[0-9]/.test(value)) {
                    return "অন্তত একটি সংখ্যা থাকতে হবে।";
                  }

                  return null;
                }}
                className="flex flex-col gap-2"
              >
                <Label className="text-sm font-semibold text-gray-800">
                  পাসওয়ার্ড
                </Label>

                <Input
                  name="password"
                  type="password"
                  placeholder="একটি শক্তিশালী পাসওয়ার্ড দিন"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 shadow-sm outline-none transition duration-200 placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />

                <Description className="text-xs leading-5 text-gray-500">
                  কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা ব্যবহার
                  করুন।
                </Description>

                <FieldError className="text-xs text-red-600" />
              </TextField>

              {/* Confirm Password */}
              <TextField
                name="confirmPassword"
                isRequired
                validate={(value) => {
                  if (!value) {
                    return "পাসওয়ার্ড আবার লিখুন।";
                  }

                  if (value !== password) {
                    return "পাসওয়ার্ড দুটি মিলছে না।";
                  }

                  return null;
                }}
                className="flex flex-col gap-2"
              >
                <Label className="text-sm font-semibold text-gray-800">
                  কনফার্ম পাসওয়ার্ড
                </Label>

                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  autoComplete="new-password"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 shadow-sm outline-none transition duration-200 placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />

                <FieldError className="text-xs text-red-600" />
              </TextField>

              {/* Form Actions */}
              <div className="mt-1 flex w-full gap-3">
                <Button
                  type="submit"
                  className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  অ্যাকাউন্ট তৈরি করুন
                </Button>

                <Button
                  type="reset"
                  className="min-h-12 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 transition duration-200 hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                >
                  রিসেট
                </Button>
              </div>
            </Form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="shrink-0 text-xs font-medium text-gray-400">
                অথবা সাইন আপ করুন
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Social Sign Up */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                type="button"
                onClick={handelSignInWithGoogle}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 shadow-sm transition duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
              >
                <svg
                  viewBox="0 0 48 48"
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.02 13.22l7.98 6.19C11.9 13.72 17.48 9.5 24 9.5Z"
                    transform="translate(0 4)"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.43 37.92 46.98 31.87 46.98 24.55Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M9.98 28.59A14.4 14.4 0 0 1 9.2 24c0-1.59.28-3.13.78-4.59L2 13.22A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.58 10.78l7.4-6.19Z"
                    transform="translate(0 4)"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.52 0-12.1-4.22-14.08-10.09L2 34.6C6.51 42.62 14.62 48 24 48Z"
                    transform="translate(0 -4)"
                  />
                </svg>

                <span>Google</span>
              </Button>

              <Button
                type="button"
                onClick={handelSigInwithGitHub}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 shadow-sm transition duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.62 1.22 3.26.93.1-.72.4-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.41.36.77 1.04.77 2.1v3.12c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"
                  />
                </svg>

                <span>GitHub</span>
              </Button>
            </div>

            {/* Sign In Link */}
            <p className="mt-7 text-center text-sm text-gray-500">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-emerald-700 underline-offset-4 transition hover:text-emerald-900 hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mx-auto mt-6 max-w-sm text-center text-xs leading-6 text-gray-500">
          অ্যাকাউন্ট তৈরি করার মাধ্যমে আপনি আপনার তথ্য সঠিকভাবে প্রদান করতে
          সম্মত হচ্ছেন।
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;