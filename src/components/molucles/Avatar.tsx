"use client";
// import Avatar from "react-avatar";

import React from "react";
import Avatar from "react-avatar";
type AvatarProps = {
    user: User;
    size: number;
    onClick?: () => void;
};

const ProfileAvatar = ({ user, size, onClick }: AvatarProps) => {
    if (!user.image) {
        return (
            <button onClick={onClick}>
                <Avatar
                    name={user.name}
                    size={(size * 10) as unknown as string}
                    round={true}
                />
            </button>
        );
    }
    return (
        <button
            style={{
                backgroundImage: `url(${user.image})`,
                width: `${size * 10}px`,
                height: `${size * 10}px`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "fill",
                borderRadius: "50%",
            }}
            onClick={onClick}
        ></button>
    );
};

export default ProfileAvatar;
