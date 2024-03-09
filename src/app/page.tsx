import NavBar from "@/components/organisms/NavBar";
import HeroSection from "@/components/organisms/HeroSection";
import Footer from "@/components/organisms/Footer";
import CategoryGrid from "@/components/organisms/CategoryGrid";
import ServicesSection from "@/components/organisms/ServicesSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-full">
      <NavBar onDashBoard={false} />
      <HeroSection />
      <ServicesSection />

      <Footer />
    </main>
  );
}
