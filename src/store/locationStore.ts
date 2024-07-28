import { create } from 'zustand';

type StoreType = {
  currentLocation: CurrentLoacation;
  setCurrentLocation: (location: CurrentLoacation) => void;
};

const useLocationStore = create<StoreType>((set) => ({
  currentLocation: {
    city: '',
    continent: '',
    continentCode: '',
    countryCode: '',
    countryName: '',
    locality: ''
  },
  setCurrentLocation: (location) => set(() => ({ currentLocation: location }))
}));

export default useLocationStore;
