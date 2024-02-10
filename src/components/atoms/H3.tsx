import React from "react";

const H3 = ({ text, className }: { text: string; className?: string }) => {
  return (
    <h3 className={`text-lg font-bold text-mainText>P ${className}`}>{text}</h3>
  );
};

export default H3;
