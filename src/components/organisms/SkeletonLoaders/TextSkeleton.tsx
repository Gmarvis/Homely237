import React from "react";

const TextSkeleton = ({ width }: { width: string }) => {
  return <div className={`bg-gray-300 h-4 ${width} rounded-sm`}></div>;
};

export default TextSkeleton;
