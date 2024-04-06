import NavBar from "@/components/organisms/NavBar";
import React from "react";

const Page = () => {
  true;
  return (
    <div>
      <NavBar hideSearchBar={true} onDashBoard={false} />
      <div className="flex justify-center items-center pt-[55px] h-[100vh] w-full ">
        <div className="w-[40rem] h-[35rem] shadow-md p-2 bg-white relative border">
          <h2 className="text-lg font-bold">More Details</h2>
          <p>
            We will need more detials for better and transparent service
            appointments
          </p>

          <button className="bg-primarytheme py-1 px-2 text-white absolute bottom-4 right-4 ">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
