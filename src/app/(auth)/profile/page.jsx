
"use client";

import { useState } from "react";
import { updateUser, useSession, signOut } from "@/lib/auth-client";
import { Check, FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { toast } from "react-toastify";
import { LogOut, UserRound, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const handelUpdateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const name = userData.name?.trim() || "";

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    if (name.length > 100) {
      toast.error("Name cannot exceed 100 characters");
      return;
    }

    if (name === user?.name) {
      toast.info("No changes were made to your name.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await updateUser({ name });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "Failed to sign out");
        return;
      }

      toast.success("Signed out successfully!");
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsSigningOut(false);
    }
  };

  const initials = (user?.name || "U").trim().slice(0, 2);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200/50">
        <span className="loading loading-spinner loading-lg text-[#05893E]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-base-200/50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
          <UserRound className="mx-auto text-[#05893E]" size={42} />

          <h2 className="mt-4 text-2xl font-bold text-base-content">
            লগইন প্রয়োজন
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>

          <Button
            className="mt-6 w-full bg-[#05893E] font-semibold text-white"
            onPress={() => router.push("/sign-in")}
          >
            সাইন ইন করুন
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Profile Header */}
        <div className="mb-8">
          <span className="text-sm font-semibold text-[#05893E]">
            ACCOUNT SETTINGS
          </span>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
            আমার প্রোফাইল
          </h2>

          <p className="mt-2 text-sm text-base-content/60 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">

          {/* Brand Banner */}
          <div className="h-28 bg-gradient-to-r from-[#047A37] via-[#05893E] to-[#12A653]" />

          <div className="flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">

            {/* User Avatar and Information */}
            <div className="-mt-12 flex min-w-0 items-center gap-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-base-100 bg-[#05893E] text-3xl font-bold uppercase text-white shadow-md">
                {initials}
              </div>

              <div className="min-w-0 pt-12">
                <h3 className="truncate text-lg font-bold text-base-content">
                  {user.name || "User"}
                </h3>

                <p className="mt-1 break-all text-sm text-base-content/60">
                  {user.email || "Email not available"}
                </p>

                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#05893E]/10 px-3 py-1 text-xs font-semibold text-[#05893E]">
                  <span className="h-2 w-2 rounded-full bg-[#05893E]" />
                  Active Account
                </span>
              </div>
            </div>

            {/* Sign Out */}
            <Button
              variant="flat"
              color="danger"
              className="shrink-0 font-semibold"
              isDisabled={isSigningOut}
              onPress={handleSignOut}
            >
              <LogOut size={17} />
              {isSigningOut ? "Signing out..." : "সাইন আউট"}
            </Button>
          </div>

          {/* Profile Information */}
          <div className="px-5 pb-7 pt-4 sm:px-8">
            <div className="mb-6 border-t border-base-300" />

            <div className="mb-6">
              <h2 className="text-xl font-bold text-base-content">
                ব্যক্তিগত তথ্য
              </h2>

              <p className="mt-1 text-sm text-base-content/60">
                Update your profile information below.
              </p>
            </div>

            <Form className="w-full" onSubmit={handelUpdateUser}>
              <Fieldset className="w-full">


                <FieldGroup>
                  <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                      if (value.trim().length < 3) {
                        return "Name must be at least 3 characters";
                      }

                      if (value.trim().length > 100) {
                        return "Name cannot exceed 100 characters";
                      }

                      return null;
                    }}
                  >
                    <Label>Name</Label>

                    <Input
                      key={user.id}
                      defaultValue={user.name || ""}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="min-h-12"
                    />

                    <FieldError />
                  </TextField>
                </FieldGroup>

                <Fieldset.Actions className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    isDisabled={isLoading || isSigningOut}
                    className="w-full bg-[#05893E] font-semibold text-white hover:bg-[#047A37] sm:w-auto"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <FloppyDisk />
                    )}

                    {isLoading ? "আপডেট করা হচ্ছে...." : "আপডেট"}
                  </Button>

                  <Button
                    type="reset"
                    variant="secondary"
                    isDisabled={isLoading || isSigningOut}
                    className="w-full sm:w-auto"
                  >
                    <Check />
                    Cancel
                  </Button>
                </Fieldset.Actions>

              </Fieldset>
            </Form>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#05893E]/10 text-[#05893E]">
              <UserRound size={21} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-base-content/50">
                Account Name
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-base-content">
                {user.name || "User"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#05893E]/10 text-[#05893E]">
              <Mail size={21} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-base-content/50">
                Email Address
              </p>
              <p className="mt-1 break-all text-sm font-semibold text-base-content">
                {user.email || "Email not available"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
