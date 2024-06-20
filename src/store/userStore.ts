import { create } from 'zustand';

type StoreType = {
    user: User;
    setUser: (user: User) => void;
};

const useUserStore = create<StoreType>((set) => ({
    user: {
        createdAt: '',
        email: '',
        id: '',
        name: '',
        password: '',
        role: '',
        updatedAt: ''
    },

    setUser: (user) => set(() => ({ user: user }))
}));

export default useUserStore;
