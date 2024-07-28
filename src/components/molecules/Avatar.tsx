'use client';
// import Avatar from "react-avatar";

import React from 'react';
type AvatarProps = {
  image?: string;
  size: number;
  onClick?: () => void;
};

const ProfileAvatar = ({ image, size, onClick }: AvatarProps) => {
  return (
    <button
      className="shadow-3xl  bg-white/20"
      style={{
        backgroundImage: `url(${
          image || 'https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg'
        })`,
        width: `${size * 10}px`,
        height: `${size * 10}px`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        objectFit: 'fill',
        borderRadius: '50%'
      }}
      onClick={onClick}
    ></button>
  );
};

export default ProfileAvatar;
