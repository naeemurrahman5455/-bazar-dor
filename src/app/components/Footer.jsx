const Footer = () => {
  return (
    <footer className="border-t border-base-200 bg-base-100">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">

          {/* Left */}
          <p className="text-sm font-semibold text-base-content sm:text-base">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Right */}
          <p className="text-xs leading-6 text-base-content/60 sm:text-right sm:text-sm">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;