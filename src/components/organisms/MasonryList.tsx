"use client";
import React from "react";
import Masonry from "react-responsive-masonry";
import { PiShareNetworkThin } from "react-icons/pi";
import ProfileAvatar from "../molucles/Avatar";

const MasonryList = () => {
	const items = Array.from({ length: 10 }).map((_, index) => (
		<div className="" key={index}>
			<div
				className={`rounded-2xl w-full hover:cursor-pointer  mobile:max-sm:w-full  h-80 bg-slate-400 ${
					index % 2 ? "h-[400px]" : "h-[300] "
				}`}
				style={{
					backgroundImage: `url("https://i.pinimg.com/564x/9a/4f/52/9a4f520dd3e771098fee00d60e09bf87.jpg")`,
					backgroundPosition: "center",
					objectFit: "contain",
				}}
			>
				{" "}
				<div className="w-full h-full bg-slate-900 duration-300   hover:opacity-35 rounded-2xl opacity-0"></div>
			</div>
			<h3 className="font-bold pt-1">Roadside baber best you can...</h3>
			<div className="flex justify-between items-center">
				<div className="flex justify-center items-center gap-2">
					<ProfileAvatar size={2} />
					<span>Sam Gmarvis</span>
				</div>
				<button className=" p-2 hover:bg-slate-200 rounded-full">
					<PiShareNetworkThin />
				</button>
			</div>
		</div>
	));
	return (
		<>
			<div className="px-24 mobile:max-sm:px-2 py-4 mobile:max-sm:hidden sm:max-lg:px-2 sm:max-lg:hidden">
				<h3>list component</h3>
				<Masonry columnsCount={5} gutter="15px">
					{items}
				</Masonry>
			</div>

			<div className="px-24 mobile:max-sm:px-2 py-4 mobile:max-sm:hidden sm:max-lg:visible lg:hidden sm:max-lg:px-2">
				<h3>list component</h3>
				<Masonry columnsCount={3} gutter="15px">
					{items}
				</Masonry>
			</div>

			<div className="px-24 mobile:max-sm:px-2 py-4   sm:hidden">
				<h3>list component</h3>
				<Masonry columnsCount={2} gutter="15px">
					{items}
				</Masonry>
			</div>
		</>
	);
};

export default MasonryList;
