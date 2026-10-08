import Image from "next/image";
import HeroSection from "./components/HomePage/HeroSection";
import SectionA from "./components/HomePage/SectionA";
import SectionB from "./components/HomePage/SectionB";
import AllProducts from "./components/HomePage/AllProducts";

export default function Home() {
  return (
    <div >
      <HeroSection></HeroSection>
      <SectionA></SectionA>
      <SectionB></SectionB>
      <AllProducts></AllProducts>
    </div>
  );
}
