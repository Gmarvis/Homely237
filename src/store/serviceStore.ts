import { create } from 'zustand';

type StoreType = {
  service: Service;
  setService: (service: Service) => void;
  services: Service[];
  setServices: (services: Service[]) => void;

  ProviderServices: Service[];
  setProviderServices: (services: Service[]) => void;
};

const useServiceStore = create<StoreType>((set) => ({
  service: {
    id: '',
    user_id: '',
    category_id: '',
    category_name: '',
    name: '',
    images: [],
    product_image: '',
    price: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    user: {
      createdAt: '',
      email: '',
      id: '',
      name: '',
      password: '',
      role: '',
      updatedAt: ''
    }
  },
  services: [],
  ProviderServices: [],
  setService: (service) => set(() => ({ service: service })),
  setServices: (services) => set(() => ({ services: services })),
  setProviderServices: (services) => set(() => ({ services: services }))
}));

export default useServiceStore;
