import NavBar from "@/components/organisms/NavBar";
import HeroSection from "@/components/organisms/HeroSection";
import Footer from "@/components/organisms/Footer";
import CategoryGrid from "@/components/organisms/CategoryGrid";

export default function Home() {
  return (
    <main className="flex flex-col  ">
      <NavBar onDashBoard={false} />
      <HeroSection />
      {/* <Footer /> */}
    </main>
  );
}
