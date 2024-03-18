import Footer from "@/components/organisms/Footer";
import NavBar from "@/components/organisms/NavBar";
import ServiceCardSkeleton from "@/components/organisms/SkeletonLoaders/ServiceCardSkeleton";
import Head from "next/head";
import React from "react";

const page = () => {
  return (
    <main>
      <Head>
        <title>servives profile</title>
      </Head>
      <NavBar onDashBoard={false} />
      <div className="pt-20 px-24 ">
        <div className="header flex justify-between items-center ">
          <h2>Product details</h2>
          <button className="bg-secondrytheme px-3 py-1">Book Service</button>
        </div>

        <ServiceCardSkeleton />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          dolorem, numquam, illum doloremque perspiciatis libero fugit
          exercitationem modi nesciunt minima quos nobis explicabo rem nostrum
          similique aspernatur culpa provident inventore sint, laudantium quae
          enim? Aspernatur ducimus, deserunt doloremque eligendi unde inventore
          voluptas consequuntur cum saepe eaque porro voluptates modi, adipisci
          quasi tenetur atque corrupti ratione dolor quo dignissimos rem
          recusandae? Possimus eos nisi quae. Rerum laboriosam eaque deleniti
          numquam asperiores fugit molestias! Architecto nam blanditiis,
          obcaecati nisi repudiandae assumenda nesciunt omnis tempora debitis,
          laboriosam ratione reprehenderit optio velit cupiditate facilis.
          Corporis eius necessitatibus voluptatem, beatae explicabo similique
          doloribus ratione reiciendis, perferendis harum tempora. Ea quam
          aperiam iste veritatis est quae necessitatibus commodi, iure et nisi
          debitis labore vero incidunt doloremque vitae quaerat, dignissimos
          dicta laboriosam quos accusantium? Nobis iusto ratione atque culpa
          labore eaque, voluptate et eveniet illo rem, voluptates accusamus
          facilis aliquid error voluptas natus sit quis est quisquam ipsam
          pariatur. Error exercitationem soluta nobis! Numquam id eos doloribus
          debitis ea animi vitae fugiat beatae ex? Recusandae autem inventore,
          molestias nisi minus architecto nulla odit ducimus quis iure,
          voluptate unde soluta deleniti velit natus debitis non voluptatum
          mollitia. Totam repellendus quam delectus molestiae eaque, perferendis
          illum aspernatur ea officia.
        </p>
      </div>
      <Footer className="" />
    </main>
  );
};

export default page;

// >>>>>>TODO<<<<<<
// >>>>>>Design the details page
// >>>>>>make api call to the backend to get product/service by product ID
