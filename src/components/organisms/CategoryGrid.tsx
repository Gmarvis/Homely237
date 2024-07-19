'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import * as Animation from '../../framerMotion/animations';
import { getAllCategories } from '@/utils/queries';
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE } from '@/utils/storage';
import Link from 'next/link';
import Image from 'next/image';

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
    if (categories.length)
        return (
            <motion.div
                variants={Animation.fadeInVariantContainer}
                className="w-full flex gap-3 justify-center py-10 mobile:max-md:overflow-x-scroll overflow-hidden overflow-x-hidden mobile:max-sm:flex-wrap">
                {categories?.slice(0, 8).map((category, i) => (
                    <Link
                        // variants={Animation.fadeGridVariants}
                        href={'/category/' + category.id}
                        // onClick={() => onCathegoryClick(category)}
                        key={i}
                        className="flex justify-between gap-3 h-16 mobile:max-sm:h-8 mobile:max-sm: items-center shadow-lgs text-slate-700 hover:scale-105 hover:bg-primarytheme hover:text-white duration-300 rounded-full p-2 bg-slate-200">
                        <div className="h-14 w-14 mobile:max-sm:w-0 rounded-full">
                            <Image
                                src={
                                    category.image ||
                                    'https://i.pinimg.com/564x/05/c7/60/05c76026986116d1d7642942051a97dd.jpg'
                                }
                                className="rounded-full h-full w-full mobile:max-sm:hidden"
                                alt=""
                                height={50}
                                width={50}
                                objectFit="contain"
                            />
                        </div>
                        <span className="pr-4 font-semibold">{category.name}</span>
                    </Link>
                ))}
            </motion.div>
        );

        return (
            <motion.div
            variants={Animation.fadeInVariantContainer}
            className="w-full flex gap-3 justify-center animate-pulse py-10 mobile:max-sm:h-8 mobile:max-md:overflow-x-scroll overflow-x-hidden mobile:max-sm:flex-wrap"
        >
            {[1,2,3,4,5,6,7,8].map((category, i) => (
                <Link
                    // variants={Animation.fadeGridVariants}
                    href={''}
                    // onClick={() => onCathegoryClick(category)}
                    key={i}
                    className="flex justify-between gap-3 h-16 w-40 mobile:max-sm:h-8 items-center shadow-lgs text-slate-700 hover:scale-105 hover:bg-primarytheme hover:text-white duration-300 rounded-full p-2 bg-slate-200"
                >
                    <div className='h-14 w-14  rounded-full mobile:max-sm:w-0 mobile:max-sm:hidden'>

                    <Image src={ "https://i.pinimg.com/564x/05/c7/60/05c76026986116d1d7642942051a97dd.jpg"} className='rounded-full h-full w-full ' alt='' height={50} width={50} objectFit='contain'/>
                    </div>
                    <span className='pr-4 font-semibold'>{}</span>
                </Link>
            ))}
        </motion.div>
        )
};

export default CategoryGrid;
