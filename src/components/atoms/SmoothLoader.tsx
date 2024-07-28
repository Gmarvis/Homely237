import Image from 'next/image';

const SmoothLoader = () => {
  return (
    <div className="animate-pulse">
      <Image src={'/logohomygig.png'} alt="homygig logo" width={115} height={65} />
    </div>
  );
};

export default SmoothLoader;
