import TextSkeleton from '@/components/organisms/SkeletonLoaders/TextSkeleton';

const DetailsSkeleton = () => {
  return (
    <div className="my-5 animate-pulse w-full">
      <TextSkeleton styles="w-80" />
      <TextSkeleton styles="w-40 h-4 mt-2" />

      <div className="py-6 flex flex-col gap- ">
        <TextSkeleton styles="w-60" />
        <TextSkeleton styles="w-[80%] h-3 mt-4" />
        <TextSkeleton styles="w-[80%] h-3 mt-1" />
        <TextSkeleton styles="w-[80%] h-3 mt-1" />
        <TextSkeleton styles="w-[80%] h-3 mt-1" />
        <TextSkeleton styles="w-[40%] h-3 mt-1" />
      </div>
      <div className="iamges flex gap-2">
        <div className="w-[60px] h-[60px] bg-gray-300"></div>
        <div className="w-[60px] h-[60px] bg-gray-300"></div>
        <div className="w-[60px] h-[60px] bg-gray-300"></div>
      </div>
      <TextSkeleton styles="w-full h-10 mt-5" />
    </div>
  );
};

export default DetailsSkeleton;
