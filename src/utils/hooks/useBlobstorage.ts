import { Image } from '@/models/blobstorage.model';
import { useRequest } from '@/utils/hooks/useRequest';
import { useState } from 'react';
import { config } from '@/config';

export interface UseBlobstorageReturn {
  error: any | null;
  uploadImage: (file: File) => Promise<Image | null>;
  deleteImage: (imageId?: string) => Promise<void>;
}

export function useBlobstorage(path = '/storage/image', baseURL = config.storageUrl): UseBlobstorageReturn {
  const { post, delete: deleteRequest } = useRequest(baseURL);
  const [error, setError] = useState<any | null>();

  const uploadImage = async (file: File): Promise<Image | null> => {
    const formData = new FormData();
    formData.append('image', file as File);
    return post<Image>(path, formData)
      .then((image) => {
        setError(null);
        return image;
      })
      .catch((e) => {
        setError(e);
        return null;
      });
  };

  const deleteImage = async (imageId?: string): Promise<void> => {
    return deleteRequest(path + (imageId == null ? '' : `/${imageId}`))
      .then(() => {
        setError(null);
      })
      .catch((e) => {
        setError(e);
      });
  };

  return {
    error,
    uploadImage,
    deleteImage,
  };
}
