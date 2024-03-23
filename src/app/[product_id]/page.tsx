import Footer from "@/components/organisms/Footer";
import NavBar from "@/components/organisms/NavBar";
import ServiceCardSkeleton from "@/components/organisms/SkeletonLoaders/ServiceCardSkeleton";
import Head from "next/head";
import ServiceDetails from "./_components/ServiceDetails";

const Page = () => {
  return (
    <main>
      <Head>
        <title>servives profile</title>
      </Head>
      <NavBar onDashBoard={false} />
      <ServiceDetails />
      {/* <Footer className="" /> */}
    </main>
  );
};

export default Page;

// >>>>>>TODO<<<<<<
// >>>>>>Design the details page
// >>>>>>make api call to the backend to get product/service by product ID
