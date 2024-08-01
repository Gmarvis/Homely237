import { ActionBtn } from '@/core/components/atoms/buttons/ActionBtn';
import ProductImageCard from '@/core/components/molecules/ProductImageCard';
import { SingleImageDropzone } from '@/core/components/molecules/SingleImageDropZone';
import { Button } from '@/core/components/ui/button';
import { useEdgeStore } from '@/core/lib/edgeStore/edgestore';
import { LOCAL_STORAGE } from '@/core/utils/storage';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type PropType = {
  onClickBack: () => void;
  onNextClick: () => void;
};

const UploadImages = ({ onClickBack, onNextClick }: PropType) => {
  // store upload
  const [file, setFile] = React.useState<any>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState<string[]>(
    JSON.parse(localStorage.getItem('images') || '[]')
  );
  const [mainImage, setMainImage] = useState('');

  const savedImages = localStorage.getItem('images') || '[]';

  useEffect(() => {
    setMainImage(localStorage.getItem('product_image') || '');
  }, []);

  const setmainImg = (image: string) => {
    setMainImage(image);
    localStorage.setItem('product_image', image);
  };

  const handleDeleteImage = async (image: string) => {
    const deleteFromStore = async () => {
      await edgestore.publicFiles
        .delete({
          url: image
        })
        .then(() => {
          const updateImages: string[] = images.filter((img: string) => img !== image);
          if (mainImage === image) {
            setMainImage('');
            localStorage.removeItem('product_image');
          }
          setImages(updateImages);
          localStorage.setItem('images', JSON.stringify(updateImages));
        });
    };
    toast.promise(deleteFromStore, {
      pending: 'Deleting Image',
      success: 'image deleted successfully',
      error: 'Failed to delete Image'
    });
  };

  const uplaodImage = async () => {
    if (file) {
      if (images.length === 4) {
        toast.warning('You can only upload 4 images', {
          position: 'top-right',
          hideProgressBar: true,
          autoClose: 3000
        });
        return;
      }
      setProgress(0);
      setIsLoading(true);
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => setProgress(progress)
      });
      setImages([...images, res.url]);
      LOCAL_STORAGE.save('images', [...images, res.url]);
      setIsLoading(false);
      setFile(null);
      setTimeout(() => {
        setProgress(0);
      }, 3000);
      // console.log("upload", res);
    }
  };

  const handleNext = () => {
    const serviceData = JSON.parse(localStorage.getItem('serviceData') || '{}');

    if (!images.length) {
      toast.warning('you most upload at least one image', {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 3000
      });
      return;
    }

    serviceData.currentStep = 3;
    LOCAL_STORAGE.save('serviceData', serviceData);
    onNextClick();
  };

  return (
    <div className="flex flex-col max-w-lg w-full gap-4  justify-center items-center  p-2 ">
      <div>
        <SingleImageDropzone
          width={450}
          height={200}
          value={file}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 1,
            onFileDialogCancel: () => setProgress(0)
          }}
          onChange={(file) => {
            setFile(file);
          }}
          className="mobile:max-sm:hidden"
        />
        <div className="w-full flex justify-center items-center sm:hidden ">
          <SingleImageDropzone
            width={350}
            height={200}
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 1,
              onFileDialogCancel: () => setProgress(0)
            }}
            onChange={(file) => {
              setFile(file);
            }}
            className="sm:hidden self-center justify-self-center"
          />
        </div>

        <div className="progress w-full border h-2 my-2">
          <div
            style={{
              width: `${progress}%`
            }}
            className="h-full w-[50%] transition-all duration-150 bg-green-600"
          ></div>
        </div>
        <div className="flex justify-between">
          <p className="py-1 text-slate-600 self-end  px-2 rounded-md shadow-md">
            {images.length}/4
          </p>
          <ActionBtn
            className="bg-slate-600 hover:bg-secondrytheme px-10"
            loading={isLoading}
            onClick={uplaodImage}
          >
            upload
          </ActionBtn>
        </div>
      </div>

      <div className="flex  gap-3 mobile:max-sm:gap-2  w-full  justify-start pt-1">
        {!images.length && (
          <div className="h-[100px]    w-full">
            <p className="text-sm text-center text-slate-400">
              Upload 4 images of you you performing your service
            </p>
          </div>
        )}
        {images.map((image: any, i: React.Key | null | undefined) => (
          <ProductImageCard key={i} image={image} showBadge={image === mainImage}>
            <button
              className="text-sm hover:bg-slate-300  text-slate-600 p-1 duration-300"
              onClick={() => setmainImg(image)}
            >
              set as main
            </button>
            <button
              className="text-sm hover:bg-slate-300  text-red-600 p-1 duration-300"
              onClick={() => handleDeleteImage(image)}
            >
              Delete
            </button>
          </ProductImageCard>
        ))}
      </div>
      <div className="flex justify-between gap-3 w-full ">
        <Button onClick={onClickBack} className=" px-10 bg-primarytheme hover:bg-secondrytheme">
          Back
        </Button>
        <Button
          disabled={images.length < 1}
          onClick={handleNext}
          className=" bg-primarytheme hover:bg-secondrytheme px-10"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UploadImages;
