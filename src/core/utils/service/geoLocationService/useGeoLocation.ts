import { getCurrentLocation } from '@/core/utils/queries';
import { useEffect, useState } from 'react';
import useLocationStore from '@/store/locationStore';

const useGeoLocation = () => {
  type LocationType = {
    loaded: boolean;
    coordinates?: {
      lat: string;
      lng: string;
    };
    locationData?: CurrentLocation;
    error?: {
      code: number;
      message: string;
    };
  };
  const { setCurrentLocation } = useLocationStore();
  const [location, setLocation] = useState<LocationType>({
    loaded: false,
    coordinates: {
      lat: '',
      lng: ''
    },
    locationData: {
      city: '',
      continent: '',
      continentCode: '',
      countryCode: '',
      countryName: '',
      locality: ''
    }
  });

  const onSuccess = async (position: { coords: { latitude: any; longitude: any } }) => {
    const data = await getCurrentLocation(position.coords.latitude, position.coords.longitude);

    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      locationData: data as unknown as CurrentLocation
    });

    setCurrentLocation(data as unknown as CurrentLocation);
  };

  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      error
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported'
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
};

export default useGeoLocation;
