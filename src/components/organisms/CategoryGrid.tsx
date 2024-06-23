'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import * as Animation from '../../framerMotion/animations';
import { getAllCategories } from '@/utils/queries';
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE } from '@/utils/storage';
import Link from 'next/link';

const CategoryGrid = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const getCats = () => {
        getAllCategories().then((res) => setCategories(res));
    };

    const router = useRouter();

    useEffect(() => {
        getCats();
    }, []);

    const onCathegoryClick = (category: Category) => {
        LOCAL_STORAGE.save('selected_Cathegory', category);
        router.push('/category');
    };

    return (
        <motion.div
            variants={Animation.fadeInVariantContainer}
            className="w-full flex gap-3 justify-center py-10 flex-wrap"
        >
            {categories?.map((category, i) => (
                <Link
                    // variants={Animation.fadeGridVariants}
                    href={'/category/' + category.id}
                    // onClick={() => onCathegoryClick(category)}
                    key={i}
                    className=" py-2 shadow-lgs text-slate-700 hover:scale-125 hover:bg-primarytheme hover:text-white duration-300 px-4 rounded-full bg-slate-200"
                >
                    <span>{category.name}</span>
                </Link>
            ))}
        </motion.div>
    );
};

export default CategoryGrid;
