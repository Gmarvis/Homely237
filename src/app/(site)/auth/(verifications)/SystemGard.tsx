'use client';
import useUserStore from '@/store/userStore';
import { decodeToken } from '@/core/utils/jwtDecode';
import { getUserById } from '@/core/utils/queries';
import useGeoLocation from '@/core/utils/service/geoLocationService/useGeoLocation';
import React, { useEffect } from 'react';

const SystemGard = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useUserStore();
  useGeoLocation();

  useEffect(() => {
    const token = localStorage?.getItem('token');
    if (token) {
      getUserById(decodeToken(token).id).then((res) => setUser(res));
    }
  }, []);

  return <>{children}</>;
};

export default SystemGard;

// VerifyUser is a component that wraps the whole application,
// Checks for token in the localstorage
// decodes the token and updates the store with user data
