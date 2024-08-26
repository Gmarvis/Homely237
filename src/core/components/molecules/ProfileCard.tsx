'use client';
import React, { useState } from 'react';
import ProfileAvatar from './Avatar';
import useUserStore from '@/store/userStore';
import Link from 'next/link';
import { DialogBox } from '../organisms/modals';
import HelperFunctions from '@/core/utils/service/helperFunctions';

const ProfileCard = () => {
  const { user } = useUserStore();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-full border border-primarytheme p-1 rounded-md flex flex-col gap-3">
      <div className="w-full flex flex-col justify-center items-center py-2 ">
        <ProfileAvatar image={user.image} size={10} />
        <h3 className="text-md font-bold">{user.name}</h3>
        <p className="text-sm text-slate-500">{user.email}</p>
      </div>

      <Link href={'/dashboard/profile'}>
        <button className="bg-primarytheme w-full py-1 text-white">View Profile</button>
      </Link>
      <button onClick={() => setOpenModal(true)} className=" w-full py-1 text-primarytheme mt-2">
        Logout
      </button>
      <DialogBox
        open={openModal}
        setOpen={setOpenModal}
        title={'Are you sure yo want to logout?'}
        onClickAction={HelperFunctions.handleLogout}
        isWarning
        description={'if you are sure click on the continue button to proceed'}
      />
    </div>
  );
};

export default ProfileCard;
