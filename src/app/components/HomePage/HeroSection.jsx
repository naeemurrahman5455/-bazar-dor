
import Image from "next/image";
import HeroImage from "../../../../public/bazar-hero.png";

const HeroSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="overflow-hidden bg-base-100">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:px-6 lg:py-16 xl:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Date */}
            <p className="mb-5 inline-flex items-center rounded-full border border-[#05893E]/10 bg-[#05893E]/10 px-4 py-2 text-sm font-bold text-[#05893E] shadow-sm sm:text-base">
              {date}
            </p>

            {/* Heading */}
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.2] tracking-tight text-black sm:text-5xl lg:text-5xl xl:text-5xl">
              আজকের বাজারদর এক নজরে
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-8 text-[#1D271F] sm:mt-6 sm:text-lg sm:leading-9">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারদর—বাজারভিত্তিক
              বিস্তারিত তথ্য, গড় দাম, সর্বনিম্ন ও সর্বোচ্চ দর এবং মূল্য
              ওঠানামার তথ্য সব এক জায়গায়।
            </p>

            {/* CTA */}
            <div className="mt-7 sm:mt-8">
              <button
                type="button"
                className="btn min-h-12 rounded-xl border-none bg-[#047F39] px-6 text-sm font-bold text-white shadow-lg shadow-[#047F39]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#05893E] hover:shadow-xl hover:shadow-[#047F39]/25 sm:px-8 sm:text-base"
              >
                সব পণ্য দেখুন
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#05893E]/10 blur-2xl sm:h-32 sm:w-32" />

            <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-[#047F39]/10 blur-2xl sm:h-40 sm:w-40" />

            {/* Image Container */}
           <div className="relative ">
          <div className="overflow-hidden rounded-3xl flex justify-end">

             <Image src={HeroImage} alt="Hero Image">

            </Image>

          </div>
        </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;