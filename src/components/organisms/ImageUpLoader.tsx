import { ActionBtn } from '@/components/atoms/buttons/ActionBtn';
import ProductImageCard from '@/components/molecules/ProductImageCard';
import { SingleImageDropzone } from '@/components/molecules/SingleImageDropZone';
import { Button } from '@/components/ui/button';
import { useEdgeStore } from '@/lib/edgeStore/edgestore';
import { LOCAL_STORAGE } from '@/utils/storage';
import { progress } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type PropType = {
  allImages: string[];
  product_image: string;
  onImagesUpload: (images: string[]) => void;
  onUpdateMainImage: (image: string) => void;
};

const ImageUpLoader = ({
  allImages,
  product_image,
  onImagesUpload,
  onUpdateMainImage
}: PropType) => {
  const [file, setFile] = useState<any>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // const [images, setImages] = useState<string[]>(
  //     JSON.parse(localStorage.getItem("images") || "[]")
  // );
  const [mainImage, setMainImage] = useState(product_image);
  const [images, setImages] = useState<string[]>(allImages);

  useEffect(() => {
    setMainImage(localStorage.getItem('product_image') || '');
  }, []);

  const setmainImg = (image: string) => {
    setMainImage(image);
  };

  const handleDeleteImage = async (image: string) => {
    const deleteFromStore = async () => {
      await edgestore.publicFiles.delete({
        url: image
      });
    };
    toast.promise(deleteFromStore, {
      pending: 'Deleting Image',
      success: 'image deleted successfully',
      error: 'Failed to delete Image',
    },
  );

    const updateImages: any = images.filter((img: string) => img !== image);
    if (mainImage === image) {
      setMainImage('');
      onUpdateMainImage('');
    }
    // setImages(updateImages);
    onImagesUpload(updateImages);
    setImages(updateImages);
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
        onProgressChange: (preg) => setProgress(preg)
      });
      // setImages([...images, res.url]);
      onImagesUpload([...images, res.url]);
      setImages([...images, res.url]);
      setIsLoading(false);
      setFile(null);
      setTimeout(() => {
        setProgress(0);
      }, 3000);
      // console.log("upload", res);
    }
  };

  return (
    <div>
      <div className="flex flex-col max-w-lg w-full gap-4  justify-center items-center  p-2 ">
        <div>
          <SingleImageDropzone
            width={380}
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
              width={300}
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
              className="h-full w-[50%] transition-all duration-150 bg-green-600"></div>
          </div>
          <div className="flex justify-between">
            <p className="py-1 text-slate-600 self-end  px-2 rounded-md shadow-md">
              {images?.length}/4
            </p>
            <ActionBtn loading={isLoading} onClick={uplaodImage}>
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
                onClick={() => {
                  setmainImg(image);
                  onUpdateMainImage(image);
                }}>
                set as main
              </button>
              <button
                className="text-sm hover:bg-slate-300  text-red-600 p-1 duration-300"
                onClick={() => handleDeleteImage(image)}>
                Delete
              </button>
            </ProductImageCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpLoader;
