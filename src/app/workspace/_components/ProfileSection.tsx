import React from 'react';
import { FaPlus } from 'react-icons/fa6';

const ProfileSection = () => {
    return (
        <div className="h-40 bg-primarytheme p-2 flex ">
            <div
                className="w-40 h-full bg-white relative"
                style={{
                    backgroundImage: `url(${
                        // user?.image ||
                        'https://i.pinimg.com/564x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg'
                    })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    objectFit: 'fill',
                    backgroundRepeat: 'no-repeat'
                    // borderRadius: "50%",
                }}
            >
                <button className="bg-primarytheme w-10 h-10 rounded-full flex justify-center items-center shadow-sm shadow-white text-white absolute bottom-2 left-[140px]">
                    <FaPlus size={24} />
                </button>
            </div>
            <div className="w-[60%] flex justify-center items-center">
                <h2 className="text-center text-gray-800 text-3xl mobile:max-sm:text-xl font-semibold">
                    Service Provider Profile
                </h2>
            </div>
        </div>
    );
};

export default ProfileSection;
