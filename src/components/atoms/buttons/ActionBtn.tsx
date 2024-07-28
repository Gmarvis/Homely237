import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from '../Spinner';
interface PropTypes {
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const ActionBtn = ({ ...props }: PropTypes) => {
  return (
    <div className="flex gap-2  items-center ">
      {props.loading && <Spinner />}
      <button
        disabled={props.loading}
        onClick={props.onClick}
        className={`${props.className} bg-primarytheme hover:bg-secondrytheme disabled:cursor-not-allowed disabled:bg-gray-300 px-8 p-2 text-white rounded-md`}
      >
        {props.children}
      </button>
    </div>
  );
};
