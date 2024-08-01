import {
  Navbar,
  HeroSection,
  CategoryGrid,
  Testimonies,
  SellWithUs,
  Footer,
  ServicesSection
} from '@/core/components/organisms';

export default function Homepage() {
  return (
    <main className="flex flex-col min-h-full">
      <Navbar onDashBoard={false} />
      <HeroSection />
      <CategoryGrid />
      <ServicesSection />
      <Testimonies />
      <SellWithUs />
      <Footer />
    </main>
  );
}
