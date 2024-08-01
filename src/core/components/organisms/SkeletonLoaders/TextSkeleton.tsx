import React from 'react';

const TextSkeleton = ({ styles }: { styles: string }) => {
  return <div className={`bg-gray-300 h-6 ${styles} rounded-sm`}></div>;
};

export default TextSkeleton;
