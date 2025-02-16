import { useGTomyContext } from '@/utils/GTomyProvider/useGTomyContext';
import { useRequest } from '@/hooks/useRequest/useRequest';
import {
  BlobstorageImage,
  UseBlobstorageProps,
  UseBlobstorageReturn,
} from '@/hooks/useBlobstorage/useBlobstorage.core';

export function useBlobstorage({ path, onError, forceStorageUrl }: UseBlobstorageProps): UseBlobstorageReturn {
  const gtomyContext = useGTomyContext();
  const baseURL = forceStorageUrl ?? gtomyContext?.storageUrl;
  const { post, delete: deleteRequest } = useRequest(baseURL);

  path ??= '/image';

  const uploadImage = async (file: File): Promise<BlobstorageImage | null> => {
    const formData = new FormData();
    formData.append('image', file as File);
    return post<BlobstorageImage>(path, formData, { maxContentLength: Infinity, maxBodyLength: Infinity })
      .then((image) => {
        return image;
      })
      .catch((e) => {
        onError(e);
        return null;
      });
  };

  const deleteImage = async (imageId?: string): Promise<void> => {
    return deleteRequest(path + (imageId == null ? '' : `/${imageId}`)).catch((e) => {
      onError(e);
    });
  };

  return {
    uploadImage,
    deleteImage,
  };
}
