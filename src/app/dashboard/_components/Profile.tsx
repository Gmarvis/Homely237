'use client';
import { Button } from '@/components/ui/button';
import { PencilLine, X } from 'lucide-react';
import useUserStore from '@/store/userStore';
import Image from 'next/image';
import { MutableRefObject, useRef, useState } from 'react';
import useFileUpload from '@/lib/edgeStore/fileUpload';
import { ActionBtn } from '@/components/atoms/buttons/ActionBtn';

export default function Profile() {
    const { user } = useUserStore();
    const imageInputRef: MutableRefObject<any> = useRef(null);
    const { convertToBase64 } = useFileUpload();

    const [baseUrl, setBaseUrl] = useState('');

    const handleOpenFile = () => {
        imageInputRef.current && imageInputRef.current.click();
    };

    const handleSelectAndConvertImage = async (e: any) => {
        const file = e.target.files[0];
        const baseUrl = await convertToBase64(file);
        setBaseUrl(baseUrl as string);
        console.log(baseUrl);
    };
    return (
        <div className="h-60 w-full bg-cyan-800 relative ">
            <div className="flex w-[95%] h-[30rem] mobile:max-lg:min-h-[85vh] mobile:max-lg:h-full mobile:max-lg:left-5 mobile:max-lg:top-10 top-32 left-10 absolute gap-10 mobile:max-lg:flex-col  mobile:max-lg:w-[95%]">
                <div className="w-[400px] h-full bg-white shadow  flex  justify-center  p-4 mobile:max-lg:w-[95%]">
                    <div className="text-center space-y-2 ">
                        <div className="w-52 h-52 rounded-full self-center relative shadow-md ">
                            <Image
                                src={baseUrl || user.image || ''}
                                height={200}
                                width={200}
                                alt="profile picture"
                                className="w-full h-full rounded-full object-cover"
                            />

                            <input
                                onChange={(e) => handleSelectAndConvertImage(e)}
                                type="file"
                                hidden
                                ref={imageInputRef && imageInputRef}
                            />
                            {baseUrl ? (
                                <Button
                                    onClick={() => setBaseUrl('')}
                                    className="absolute bottom-5 py-7 rounded-md duration-300 transform right-[-10px]"
                                    variant="secondary">
                                    <X />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleOpenFile}
                                    className="absolute bottom-5 py-7 rounded-full duration-300 transform right-[-10px]"
                                    variant="secondary">
                                    <PencilLine />
                                </Button>
                            )}
                        </div>
                        <div className="space-y-2 text-xl font-semibold">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col  gap-2 h-full bg-white shadow  mobile:max-lg:w-[95%]   relative p-4">

                <div className="flex flex-col w-full">
                        <label htmlFor="" className="font-semibold">
                            Title
                        </label>
                        <input type="text" defaultValue={user.service_title} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="font-semibold">
                            Phone Number
                        </label>
                        <input type="number" defaultValue={user.phone} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="font-semibold">
                            Location
                        </label>
                        <input type="text" defaultValue={user.location} />
                    </div>

                    <div>
                        <label htmlFor="" className="font-semibold">
                            Bio
                        </label>
                        <textarea className="px-2 w-full h-20" defaultValue={user.bio} />
                    </div>

                    <div className="flex justify-end absolute mobile:max-lg:relative bottom-2 right-2">
                        <ActionBtn className="" onClick={() => {}}>
                            save
                        </ActionBtn>
                    </div>
                </div>
            </div>
        </div>
    );
}
