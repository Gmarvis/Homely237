'use client';
import useUserStore from '@/store/userStore';
import { decodeToken } from '@/core/utils/jwtDecode';
import { getProfile } from '@/core/utils/queries';
import useGeoLocation from '@/core/utils/service/geoLocationService/useGeoLocation';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SystemGard = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useUserStore();
  useGeoLocation();

  const router = useRouter();

  const isTokenExpired = (token: string) => {
    try {
      const { exp } = decodeToken(token);
      if (exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  };

  const getUserProfile = async (id: string) => {
    const userData = await getProfile(id).then((res) => res);
    console.log('user logged id', userData);
    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage?.getItem('token');
    if (token) {
      const { id } = decodeToken(token);
      isTokenExpired(token) ? router.replace('/auth') : getUserProfile(id);
    }
  }, []);

  return <>{children}</>;
};

export default SystemGard;

// VerifyUser is a component that wraps the whole application,
// Checks for token in the localstorage
// decodes the token and updates the store with user data
