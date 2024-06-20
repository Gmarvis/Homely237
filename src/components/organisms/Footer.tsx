'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import SocialLinks from './SocialLinks';
const Footer = ({ className }: { className?: string }) => {
    const companyLinks = [
        {
            href: '',
            name: 'Partners'
        },
        {
            href: '',
            name: 'Blog'
        },
        {
            href: '',
            name: 'Team'
        },
        {
            href: '',
            name: 'Careers'
        }
    ];

    const footerNavs = [
        {
            label: 'Company',
            items: [
                {
                    href: '',
                    name: 'Partners'
                },
                {
                    href: '',
                    name: 'Blog'
                },
                {
                    href: '',
                    name: 'Team'
                },
                {
                    href: '',
                    name: 'Careers'
                }
            ]
        },
        {
            label: 'Resources',
            items: [
                {
                    href: '',
                    name: 'contact'
                },
                {
                    href: '',
                    name: 'Support'
                },
                {
                    href: '',
                    name: 'Docs'
                },
                {
                    href: '',
                    name: 'Pricing'
                }
            ]
        },
        {
            label: 'About',
            items: [
                {
                    href: '',
                    name: 'Terms'
                },
                {
                    href: '',
                    name: 'License'
                },
                {
                    href: '',
                    name: 'Privacy'
                },
                {
                    href: '',
                    name: 'About US'
                }
            ]
        }
    ];

    const services = [
        {
            name: 'Booking',
            path: '/'
        },
        {
            name: 'Listing',
            path: '/'
        },
        {
            name: 'consultations',
            path: '/'
        }
    ];

    return (
        <footer
            className={`text-gray-500 ${className} px-24 py-5 mobile:max-sm:px-5 bg-primarytheme bigScreen:px-80`}
        >
            <div className="grid grid-cols-5 sm:max-md:grid-cols-2 mobile:max-sm:grid-cols-1 mobile:max-sm:gap-3">
                <div className="logo-footer-section flex flex-col gap-2">
                    <Link href={'/'} className={` w-full `}>
                        <Image src={'/whitelogo.png'} alt="homygig logo" width={110} height={60} />
                    </Link>
                    <p className="text-[12px] text-gray-700">
                        It has never been more easy to find home service providers in cameroon than
                        now, thanks to homygig, customers are happy and service providers are
                        exited, we are proud for making life better in Cameroon.
                    </p>
                    <SocialLinks />
                </div>
                <div className="nav-links">
                    <h3></h3>
                </div>

                <div className="our-company">
                    <h3 className="subTitle">Our Company</h3>
                    <ul className="flex gap-3 flex-col py-3">
                        {companyLinks.map((item, i) => (
                            <Link
                                href={item.href}
                                key={i}
                                className=" text-[12px] text-gray-700 hover:text-secondrytheme transition-all duration-300"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className="nav-features">
                    <h3 className="subTitle">Services</h3>
                    <ul className="flex gap-3 flex-col py-3">
                        {services.map((item, i) => (
                            <Link
                                href={item.path}
                                key={i}
                                className=" text-[12px] text-gray-700 hover:text-secondrytheme transition-all duration-300 "
                            >
                                {item.name}
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className="subscribe flex flex-col w-full gap-4 px-2">
                    <div className="flex self-center  rounded-full bg-secondrytheme w-20 h-20 mobile:max-sm:hidden">
                        <Image src={'/cookwithlogo.png'} width={200} height={500} alt="" />
                    </div>
                    <p className="text-[12px] text-gray-700">
                        Stay up-to-date with our latest trends and news by subscribing to our
                        newsletters
                    </p>

                    <form className="flex justify-between items-center border-2 border-secondrytheme ">
                        <input
                            className="w-full border-none outline-none bg-transparent text-[12px] pl-2"
                            placeholder="your@email.com"
                            type="text"
                        />
                        <button className="bg-secondrytheme text-white text-sm py-1 px-1">
                            subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="copyrights  p-4">
                <p className="text-center text-[12px] text-slate-300 ">copyrights @2024 homygig</p>
            </div>
        </footer>
    );
};

export default Footer;
