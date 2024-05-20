import { useEffect, useState } from "react";

const useGeoLocation = () => {
    type LocationType = {
        loaded: boolean;
        coordinates?: {
            lat: string;
            lng: string;
        };
        error?: {
            code: number;
            message: string;
        };
    };

    const [location, setLocation] = useState<LocationType>({
        loaded: false,
        coordinates: {
            lat: "",
            lng: "",
        },
    });

    const onSuccess = (position: {
        coords: { latitude: any; longitude: any };
    }) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            },
        });
    };

    const onError = (error: { code: number; message: string }) => {
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }, []);

    return location;
};

export default useGeoLocation;
