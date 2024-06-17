import { create } from 'zustand';

type StoreType = {
    category: Category;
    setCategory: (catogory: Category) => void;
    categories: Category[];
    setCategories: (categories: Category[]) => void;
};

const useCategoryStore = create<StoreType>((set) => ({
    category: {
        id: '',
        name: '',
        image: '',
        createdAt: '',
        updatedAt: ''
    },
    categories: [],
    setCategory: (category) => set(() => ({ category: category })),
    setCategories: (categories) => set(() => ({ categories: categories }))
}));

export default useCategoryStore;
