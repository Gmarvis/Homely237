'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SearchForm from '../../molecules/SearchForm';
import BellBtn from '../../atoms/buttons/BellBtn';
import { HiMenuAlt3 } from 'react-icons/hi';

import { motion } from 'framer-motion';
import DropDown from '../../molecules/DropDown';

import { usePathname } from 'next/navigation';

import ProfileAvatar from '../../molecules/Avatar';
import ProfileCard from '../../molecules/ProfileCard';
import Overlay from '../../atoms/Overlay';
import { getAllCategories, getAllServices } from '@/core/utils/queries';

import { LinkBtn, LinkBtnTheme } from '../../atoms/buttons/LinkBtn';
import { RightModal } from '../modals/RightModal';
import { navLinks } from '../SideBar';
import { useUserStore, useServiceStore, useCategoryStore } from '@/store/';
import { Button } from '../../ui/button';
import { X } from 'lucide-react';
import { DialogBox } from '../modals';
import HelperFunctions from '@/core/utils/service/helperFunctions';

type NavTypes = {
  onDashBoard?: Boolean;
  hideSearchBar?: Boolean;
};

const NavBar = ({ onDashBoard = false, hideSearchBar = false }: NavTypes) => {
  const pathName = usePathname();
  const { user } = useUserStore();
  const { setServices } = useServiceStore();
  const { setCategories } = useCategoryStore();
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const update = async () => {
    // Fetch all Categories from DB
    const allCategories = await getAllCategories();
    setCategories(allCategories);
    // Fetch all Services from DB
    const allServices = await getAllServices();
    setServices(allServices);
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <div
      className={`flex bigScreen:w-full bigScreen:py-5 fixed justify-between z-30 shadow-md ${
        onDashBoard ? ' px-5 relative mobile:max-sm:fixed ' : 'px-24 fixed '
      }  py-2 items-center mobile:max-sm:px-5  w-full bg-white slate-3 00`}
    >
      <div>
        <Link
          href={'/'}
          className={`self-center w-full ${
            onDashBoard ? 'sm:hidden mobile:max-sm:visible' : ''
          }  flex items-center justify-center`}
        >
          <Image src={'/logohomygig.png'} alt="homygig logo" width={150} height={65} />
        </Link>
      </div>

      <div className={`sear mobile:max-sm:hidden  ${onDashBoard ? 'hidden' : 'visible'}`}>
        {!hideSearchBar && <SearchForm />}
      </div>

      {user?.id ? (
        <div className="flex justify-center items-center gap-3">
          <Link
            className={`text-sm font-semibold ${onDashBoard ? 'hidden' : ''} `}
            href={`${['admin', 'provider'].includes(user.role) ? '/dashboard' : '/dashboard/appointments'}`}
          >
            {`${['admin', 'provider'].includes(user.role) ? 'Dashboard' : 'Appointments'} `}
          </Link>
          <BellBtn onClick={() => setShowNotification((prev) => !prev)} />
          <div className={` ${onDashBoard ? 'hidden' : ''}  mobile:max-sm:hidden`}>
            <ProfileAvatar
              onClick={() => setShowProfile((prev) => !prev)}
              image={user.image}
              size={3}
            />
          </div>
          {showProfile && <Overlay onClick={() => setShowProfile((prev) => !prev)} transparent />}
          {showProfile && (
            <motion.div
              className={`absolute top-[57px] right-2 w-[300px] mobile:max-sm:w-[80vw]  mobile:max-sm:right-10 z-40`}
              initial={{ opacity: 1, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DropDown
                title="Profile"
                onBlur={() => setShowProfile((prev) => !prev)}
                className={''}
              >
                <ProfileCard />
              </DropDown>
            </motion.div>
          )}

          {showNotification && (
            <Overlay onClick={() => setShowNotification((prev) => !prev)} transparent />
          )}

          {showNotification && (
            // <SheetSide />

            <motion.div
              initial={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0.3 }}
              transition={{ duration: 0.3 }}
              className="absolute top-[57px] right-1 z-40"
            >
              <DropDown
                title={'Notifications'}
                onBlur={() => setShowNotification((prev) => !prev)}
                className="w-[20vw]"
              >
                <h3>no new notification</h3>
              </DropDown>
            </motion.div>
          )}

          <button
            onClick={() => setOpenModal((prev) => !prev)}
            className="text-gray-700 sm:hidden absolute top-[13px] right-3"
          >
            <HiMenuAlt3 size={30} />
          </button>
          <RightModal
            open={openModal}
            setOpen={setOpenModal}
            title="Menu"
            className="bg-primarytheme"
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                className={`text-sm font-semibold  ${link.role.includes(user.role) ? 'visible' : 'hidden'} text-white flex items-center gap-2`}
                href={link.path}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {pathName === '/dashboard/profile' ? (
              <Button
                onClick={() => setOpenDialog(true)}
                variant={'secondary'}
                className="my-3 justify-center items-center  absolute w-40  bottom-3 left-2"
              >
                Logout
              </Button>
            ) : (
              <Link
                href={'/dashboard/profile'}
                className="absolute bottom-4 flex justify-center items-center gap-4"
              >
                <ProfileAvatar size={4} image={user.image} />
                <span className="font-medium text-white">{user.name}</span>
              </Link>
            )}
          </RightModal>
          <DialogBox
            open={openDialog}
            setOpen={setOpenDialog}
            title={'Are you sure yo want to logout?'}
            onClickAction={HelperFunctions.handleLogout}
            isWarning
            description={'if you are sure click on the continue button to proceed'}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <LinkBtn title="Get Started" path="/auth" theme={LinkBtnTheme.themeColor} />
        </div>
      )}

      {devMode && (
        <div className="w-full bg-primarytheme/70 absolute left-0 top-0 flex justify-center">
          <h3 className="py-4">This application is undergoing new changes!</h3>
          <Button
            onClick={() => setDevMode((prev) => !prev)}
            variant={'link'}
            className="absolute right-1 top-1"
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
