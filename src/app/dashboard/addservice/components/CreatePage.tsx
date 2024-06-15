"use client";
import { Button } from "@/components/ui/button";
import { createService } from "@/utils/queries";
import React, { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { toast } from "react-toastify";

type PropType = {
	onCreateSuccess: () => void;
	onClickBack: () => void;
};

const CreatePage = ({ ...props }: PropType) => {
	const [data, setData] = useState<Service>();
	const serviceData = JSON.parse(localStorage.getItem("serviceData") || "{}");
	const images = JSON.parse(localStorage.getItem("images") || "[]");
	const [loading, setLoading] = useState(false);

	let product_image = localStorage.getItem("product_image");
	if (!product_image) product_image = images[0];

	const { user } = useUserStore();
	const serviceDetals = {
		...serviceData.serviceDetails,
		product_image: product_image,
		images: images,
		user_id: user.id,
	};

	useEffect(() => {
		setData(serviceDetals);
	}, []);

	const handleSubmit = async () => {
		setLoading(true);
		createService(serviceDetals).then(async (res) => {
			if (res.id) {
				localStorage.removeItem("images");
				localStorage.removeItem("serviceData");
				localStorage.removeItem("product_image");
				props.onCreateSuccess();
				setLoading(false);
			} else {
				let error = await res;
				toast.error("Failed to create service! try again", {
					position: "top-right",
					hideProgressBar: true,
					autoClose: 3000,
				});
				setLoading(false);
			}
		});
	};

	return (
		<div className="h-full w-full flex justify-center items-center">
			{data && (
				<div className="div text-center shadow-md w-full max-w-xl py-4 mt-10 flex flex-col gap-2">
					<h1 className="text-gray-700 text-xl">You are almost done</h1>
					<p>click on the finish button to complete creating your service</p>

					<Button
						disabled={loading}
						className="bg-primarytheme disabled:bg-gray-800"
						onClick={handleSubmit}
					>
						{loading ? "loading..." : "finish"}
					</Button>
					<span
						onClick={props.onClickBack}
						className="bg-primarytheme hover:bg-secondrytheme px-10 text-sm"
					>
						take another look
					</span>
				</div>
			)}
		</div>
	);
};

export default CreatePage;
