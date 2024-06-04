import SmoothLoader from "@/components/atoms/SmoothLoader";

const DedicatedLoader = () => {
    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <SmoothLoader />
        </div>
    );
};

export default DedicatedLoader;
