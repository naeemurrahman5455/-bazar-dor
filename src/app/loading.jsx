import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50 text-slate-800 animate-pulse">
      {/* 1. Navbar Skeleton */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="w-24 h-5 bg-gray-200 rounded" />
          </div>
          {/* Nav Links / Actions */}
          <div className="hidden md:flex items-center gap-6">
            <div className="w-16 h-4 bg-gray-200 rounded" />
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="w-16 h-4 bg-gray-200 rounded" />
          </div>
          <div className="w-28 h-9 bg-gray-200 rounded-lg" />
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        
        {/* 2. Hero Banner Skeleton */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-4 w-full md:w-2/3">
            <div className="w-32 h-6 bg-gray-200 rounded-full" />
            <div className="w-3/4 h-8 bg-gray-200 rounded-md" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-5/6 h-4 bg-gray-200 rounded" />
            </div>
            <div className="w-36 h-10 bg-gray-200 rounded-xl pt-2" />
          </div>
          {/* Hero Illustration / Basket Placeholder */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-2xl shrink-0" />
        </div>

        {/* 3. Market Section Skeletons (Repeated for sections like Price Increase/Decrease/All Products) */}
        {[1, 2, 3].map((sectionIdx) => (
          <section key={sectionIdx} className="space-y-4">
            
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="w-48 h-6 bg-gray-200 rounded" />
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded" />
            </div>

            {/* 3-Column Grid of Product/Price Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((cardIdx) => (
                <div 
                  key={cardIdx} 
                  className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between gap-4 shadow-sm"
                >
                  {/* Left: Product Icon & Name/Unit */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0" />
                    <div className="space-y-2">
                      <div className="w-24 h-4 bg-gray-200 rounded" />
                      <div className="w-16 h-3 bg-gray-200 rounded" />
                    </div>
                  </div>

                  {/* Right: Price & Change Indicator */}
                  <div className="text-right space-y-2">
                    <div className="w-16 h-4 bg-gray-200 rounded ml-auto" />
                    <div className="w-12 h-3 bg-gray-200 rounded ml-auto" />
                  </div>
                </div>
              ))}
            </div>

          </section>
        ))}

      </main>
    </div>
  );
}