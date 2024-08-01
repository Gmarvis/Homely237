import React from 'react';
import Spinner from '../../loaders/SpinningLoader/SpinningLoader';

type BtnType = {
  isLoading: boolean;
  title: string;
  onClick?: () => void;
};

const FormBtn = ({ isLoading, title, onClick }: BtnType) => {
  return (
    <button
      disabled={isLoading}
      className={`hover:bg-gray-400 disabled:cursor-wait disabled:bg-gray-500 bg-primarytheme  text-white p-2 justify-center items-center w-full`}
    >
      <span className="flex self-center justify-center">
        {isLoading ? <Spinner /> : <>{title}</>}
      </span>
    </button>
  );
};

export default FormBtn;
