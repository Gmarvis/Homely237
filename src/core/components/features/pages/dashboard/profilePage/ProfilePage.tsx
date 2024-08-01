'use client';
import { Button } from '@/core/components/ui/button';
import { Flag, PencilLine } from 'lucide-react';
import Image from 'next/image';
import { MutableRefObject, useRef, useState } from 'react';
import useFileUpload from '@/core/lib/edgeStore/fileUpload';
import { ActionBtn } from '@/core/components/atoms/buttons/ActionBtn';
import { toast } from 'react-toastify';
import { useEdgeStore } from '@/core/lib/edgeStore/edgestore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/core/components/ui/dialog';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Textarea } from '@/core/components/ui/textarea';
import { updateUserProfile } from '@/core/utils/queries';
import { progress } from 'framer-motion';
import useUserStore from '@/store/userStore';

export default function ProfilePage() {
  const { user, setUser } = useUserStore();
  const [file, setFile] = useState<File>();
  const imageInputRef: MutableRefObject<any> = useRef(null);
  const modalRef: MutableRefObject<any> = useRef(null);
  const { convertToBase64 } = useFileUpload();
  const { edgestore } = useEdgeStore();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [name, setName] = useState(user.name);
  const [service_title, setServiceTitle] = useState(user.service_title || '');
  const [location, setLocation] = useState(user.location || '');
  const [phone, setPhone] = useState(user.phone);
  const [bio, setBio] = useState(user.bio);

  const handleOpenFile = () => {
    imageInputRef.current && imageInputRef.current.click();
  };

  const handleSelectAndConvertImage = async (e: any) => {
    const file = e.target.files[0];

    if (file.type.split('/')[0] !== 'image') {
      toast.warning('only images are allowed', {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 3000
      });
      return;
    }
    setFile(file);
    const baseUrl = await convertToBase64(file);
    modalRef.current.click();
    setBaseUrl(baseUrl as string);
  };

  const uploadImage = async () => {
    if (file) {
      setUploading(true);
      const imageUrl = user.image?.split('/').includes('files.edgestore.dev')
        ? await edgestore.profilePictures.upload({
            file,
            options: {
              replaceTargetUrl: user.image
            }
          })
        : await edgestore.profilePictures.upload({
            file
          });
      await updateUserProfile(user.id, { image: imageUrl.url }).then(
        (updatedUserData: User | void) => {
          updatedUserData && setUser(updatedUserData);
          toast.success('Profile picture updated', {
            position: 'top-right',
            hideProgressBar: true,
            autoClose: 3000
          });
          setUploading(false);
        }
      );
    }
  };

  const handleChangePhoneNumber = (phoneNumber: string) => {
    setPhone(phoneNumber);
  };

  const updateUserData = async () => {
    if (!name) {
      toast.warning('Name should not empty!', {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 3000
      });
      setLoading(false);
      return;
    }

    setLoading(true);
    if (!phone || phone.length !== 9) {
      toast.warning('phone number is required and should contain nine(9) digits!', {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 3000
      });
      setLoading(false);
      return;
    }

    await updateUserProfile(user.id, {
      phone,
      name,
      location,
      bio,
      service_title
    }).then((res) => {
      setUser(res);
      toast.success('profile updated successfully', {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 3000
      });
      setLoading(false);
    });
  };

  return (
    <div className="h-60 w-full bg-cyan-800 relative ">
      <div className="flex w-[95%] h-[30rem] mobile:max-lg:min-h-[85vh] mobile:max-lg:h-full mobile:max-lg:left-5 mobile:max-lg:top-10 top-32 left-10 absolute gap-10 mobile:max-lg:flex-col  mobile:max-lg:w-[95%]">
        <div className="w-[400px] h-full bg-white shadow  flex  justify-center  p-4 mobile:max-lg:w-[95%]">
          <div className="text-center space-y-2 ">
            <div className="w-52 h-52 rounded-full self-center relative shadow-md ">
              <Image
                src={
                  user.image ||
                  'https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg'
                }
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

              <Button
                onClick={handleOpenFile}
                className="absolute bottom-5 py-7 rounded-full duration-300 transform right-[-10px]"
                variant="secondary"
              >
                <PencilLine />
              </Button>
            </div>
            <div className="space-y-2 text-xl text- w-full cyan-800 font-medium">
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="w-full  flex flex-col gap-2 h-full bg-white shadow  mobile:max-lg:w-[95%]   relative p-4 ">
          <div className="w-full flex gap-4">
            <div className="w-full space-y-4">
              <div className="w-full">
                <Label>Name</Label>
                <Input onChange={(e) => setName(e.target.value)} defaultValue={user.name} />
              </div>
              <div className="w-full">
                <Label>Location</Label>
                <Input value={user.location} />
              </div>
            </div>
            <div className="w-full space-y-4">
              <div>
                <Label>Service Title</Label>
                <Input
                  onChange={(e) => setServiceTitle(e.target.value)}
                  defaultValue={user.service_title}
                  type="text"
                />
              </div>
              <div>
                <Label>Phone number</Label>
                <Input
                  maxLength={9}
                  placeholder="670000000"
                  onChange={(e) => handleChangePhoneNumber(e.target.value)}
                  defaultValue={user.phone}
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <Label>Bio</Label>
            <Textarea
              onChange={(e) => setBio(e.target.value)}
              className="h-[75%]"
              defaultValue={user.bio}
            />
          </div>
          <div className="flex justify-end mobile:max-lg:mt-5 absolute  mobile:max-lg:relative bottom-2 right-2">
            <ActionBtn loading={loading} className="" onClick={updateUserData}>
              save
            </ActionBtn>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger ref={modalRef} asChild>
          <Button variant="outline" className="hidden"></Button>
        </DialogTrigger>

        <DialogContent className="w-[]">
          <DialogHeader>
            <DialogTitle>Edit Profile Picture</DialogTitle>

            <DialogDescription>
              You will not be able to undo this change after saving changes!
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full justify-center items-center">
            <div className="w-[200px] h-[200px] flex justify-center item">
              <Image
                src={baseUrl || user?.image || ''}
                height={100}
                width={100}
                alt="profile picture"
                className="w-full h-full rounded-full object-cover border-1 border"
              />
            </div>
          </div>
          <DialogFooter>
            <ActionBtn onClick={uploadImage} loading={uploading}>
              save changes
            </ActionBtn>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
