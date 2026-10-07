

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";

const toBanglaNumber = (number) => {
  return number
    .toString()
    .replace(/0/g, "০")
    .replace(/1/g, "১")
    .replace(/2/g, "২")
    .replace(/3/g, "৩")
    .replace(/4/g, "৪")
    .replace(/5/g, "৫")
    .replace(/6/g, "৬")
    .replace(/7/g, "৭")
    .replace(/8/g, "৮")
    .replace(/9/g, "৯")
    .replace(/\./g, ".");
};

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  const data = await res.json();

  return (
    <div className="w-full overflow-hidden bg-base-100">
      <MarqueeText direction="right" duration="10">
        <div className="flex items-center gap-3 py-3">
          {[...data, ...data].map((Mitems, index) => (
            <Link
              href={Mitems.slug}
              key={`${Mitems.id}-${index}`}
              className="group shrink-0"
            >
              <div className="flex items-center gap-3 rounded-full border border-base-300 bg-base-200/60 px-4 py-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#05893E] hover:bg-base-100 hover:shadow-md">
                {/* Category Icon */}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow-sm transition-transform duration-200 group-hover:scale-110">
                  {Mitems.categoryIcon}
                </span>

                {/* Product Name */}
                <p className="whitespace-nowrap text-sm font-semibold text-base-content">
                  {Mitems.nameBn}
                </p>

                {/* Price */}
                <p className="whitespace-nowrap text-sm font-bold text-[#05893E]">
                  {toBanglaNumber(Mitems.today)} টাকা/কেজি
                </p>

                {/* Price Change */}
                {Mitems.change.dir === "up" ? (
                  <div className="flex items-center">
                    <p className="rounded-full bg-[#D03739]/10 px-2.5 py-1 text-xs font-bold text-[#D03739]">
                      ▲ {toBanglaNumber(Mitems.change.pct)}% বৃদ্ধি
                    </p>
                  </div>
                ) : Mitems.change.dir === "down" ? (
                  <div className="flex items-center">
                    <p className="rounded-full bg-[#1A9951]/10 px-2.5 py-1 text-xs font-bold text-[#1A9951]">
                      ▼ {toBanglaNumber(Mitems.change.pct)}% কমেছে
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="rounded-full bg-base-300 px-2.5 py-1 text-xs font-medium text-base-content/60">
                      ০% পরিবর্তন নেই
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
