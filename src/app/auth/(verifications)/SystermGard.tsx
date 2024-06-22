'use client';
import useUserStore from '@/store/userStore';
import { decodeToken } from '@/utils/jwtDecode';
import { getUserById } from '@/utils/queries';
import useGeoLocation from '@/utils/service/geoLocationService/useGeoLocation';

import React, { useEffect } from 'react';

const SystermGard = ({ children }: { children: React.ReactNode }) => {
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

export default SystermGard;

// VerifyUser is a component that wraps the whole application,
// Checks for token in the localstage
// decodes the token and updates the store with user data
