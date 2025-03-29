import { useRequest } from '@/hooks/useRequest/useRequest';
import {
  BlobstorageImage,
  UseBlobstorageProps,
  UseBlobstorageReturn,
} from '@/hooks/useBlobstorage/useBlobstorage.core';

export function useBlobstorage({ path, onError, storageUrl }: UseBlobstorageProps): UseBlobstorageReturn {
  const { post, delete: deleteRequest } = useRequest(storageUrl);

  path ??= '/image';

  const uploadImage = async (file: File): Promise<BlobstorageImage | null> => {
    const formData = new FormData();
    formData.append('image', file as File);
    return post<BlobstorageImage>(path, formData, { maxContentLength: Infinity, maxBodyLength: Infinity }).catch(
      (e) => {
        onError(e);
        return null;
      }
    );
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
