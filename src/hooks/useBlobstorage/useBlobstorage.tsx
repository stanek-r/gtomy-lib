import { useRequest } from '@/hooks/useRequest/useRequest';
import {
  BlobstorageImage,
  UseBlobstorageProps,
  UseBlobstorageReturn,
} from '@/hooks/useBlobstorage/useBlobstorage.core';
import { useCallback } from 'react';

export function useBlobstorage({ path, onError, storageUrl }: UseBlobstorageProps): UseBlobstorageReturn {
  const { post, delete: deleteRequest } = useRequest(storageUrl);

  const uploadImage = useCallback(
    async (file: File): Promise<BlobstorageImage | null> => {
      const formData = new FormData();
      formData.append('image', file as File);
      return post<BlobstorageImage>(path ?? '/image', formData, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }).catch((e) => {
        onError(e);
        return null;
      });
    },
    [onError, path, post]
  );

  const deleteImage = useCallback(
    async (imageId?: string): Promise<void> => {
      return deleteRequest((path ?? '/image') + (imageId == null ? '' : `/${imageId}`)).catch((e) => {
        onError(e);
      });
    },
    [deleteRequest, onError, path]
  );

  return {
    uploadImage,
    deleteImage,
  };
}
