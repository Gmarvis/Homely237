'use client';
// import Avatar from "react-avatar";

import React from 'react';
type AvatarProps = {
    user?: User;
    size: number;
    onClick?: () => void;
};

const ProfileAvatar = ({ user, size, onClick }: AvatarProps) => {
    return (
        <button
            style={{
                backgroundImage: `url(${
                    user?.image ||
                    'https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg'
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
