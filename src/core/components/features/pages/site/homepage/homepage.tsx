'use client';
import {
  Navbar,
  HeroSection,
  CategoryGrid,
  Testimonies,
  SellWithUs,
  Footer,
  ServicesSection
} from '@/core/components/organisms';
import { useUserStore } from '@/store';

export default function Homepage() {
  const { user } = useUserStore();
  return (
    <main className="flex flex-col min-h-full">
      <Navbar onDashBoard={false} />
      <HeroSection />
      <CategoryGrid />
      <ServicesSection />
      <Testimonies />
      {![, "", "admin", "provider"].includes(user.role) && <SellWithUs />}
      <Footer />
    </main>
  );
}
