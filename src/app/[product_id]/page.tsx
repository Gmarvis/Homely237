import Footer from '@/components/organisms/Footer';
import NavBar from '@/components/organisms/NavBar';
import Head from 'next/head';
import ServiceDetails from './_components/ServiceDetails';

const Page = () => {
  return (
    <div className="">
      <Head>
        <title>servives profile</title>
      </Head>
      <NavBar onDashBoard={false} />
      <ServiceDetails />
      <Footer className="" />
    </div>
  );
};

export default Page;
