import Link from "next/link";
import React from "react";
// React icons
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

const socialLinks = [
	{
		name: "facebook",
		path: "",
		icon: <FaFacebookSquare size={24} />,
	},
	{
		name: "linkedin",
		path: "",
		icon: <FaLinkedin size={24} />,
	},
	{
		name: "instagram",
		path: "",
		icon: <FaInstagramSquare size={24} />,
	},
	{
		name: "whatsApp",
		path: "",
		icon: <FaSquareWhatsapp size={24} />,
	},
];

const SocialLinks = () => {
	return (
		<div className="flex w-full gap-2">
			{socialLinks.map((link, i) => (
				<Link href={link.path} target="_blank" className="text-white" key={i}>
					{link.icon}
					{/* {link.name} */}
				</Link>
			))}
		</div>
	);
};

export default SocialLinks;
