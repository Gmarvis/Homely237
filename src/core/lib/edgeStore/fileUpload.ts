import { toast } from 'react-toastify';
import { useEdgeStore } from './edgestore';

const useFileUpload = () => {
  const { edgestore } = useEdgeStore();

  const upload = async (file: File) => {
    return await edgestore.publicFiles.upload({
      file
    });
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return { upload, convertToBase64 };
};

export default useFileUpload;
