import React, { ReactNode } from 'react';

interface Props {
  onClick: () => void;
  transparent?: boolean;
  children?: ReactNode;
}

const Overlay = ({ onClick, transparent, children }: Props) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`h-[100vh] w-[100vw]   ${
          transparent ? '' : 'bg-black/40'
        }  fixed top-0 right-0 z-30 flex justify-center items-center`}
      />

      <div className={'fixed top-1/2 left-1/2 -translate-x-1/2 -1translate-y-1/2 '}>{children}</div>
    </>
  );
};

export default Overlay;
