import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-base-100 px-4">
      <div className="mx-auto max-w-xl text-center">

        {/* 404 */}
        <div className="mb-6">
          <h1 className="text-8xl font-black tracking-tight text-[#05893E] sm:text-9xl">
            ৪০৪
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-base-content sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-base-content/60 sm:text-base">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
          পরিবর্তন করা হয়েছে অথবা URL-টি সঠিক নয়।
        </p>

        {/* CTA */}
        <div className="mt-7">
          <Link
            href="/"
            className="btn min-h-12 rounded-xl border-none bg-[#047F39] px-7 text-sm font-bold text-white shadow-lg shadow-[#047F39]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#05893E] hover:shadow-xl hover:shadow-[#047F39]/25 sm:text-base"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </main>
  );
};

export default NotFound;