


import HeaderClient from "./HeaderClient";
import Marquee from "./Marquee";
import Navlinks from "./Navlinks";

const Header = async () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  let categories = [];

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/bazardor/categories`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      categories = Array.isArray(data) ? data : [];
    } else {
      console.error("Categories API Error:", res.status);
    }
  } catch (error) {
    console.error("Categories API Error:", error);
  }

  return (
    <header className="border-b border-base-300 bg-base-100">
      {/* Logo, Date and Authentication */}
      <HeaderClient
        date={date}
        categories={categories}
      />

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navlinks data={categories} />
      </div>

      {/* Price Marquee */}
      <Marquee />
    </header>
  );
};

export default Header;





