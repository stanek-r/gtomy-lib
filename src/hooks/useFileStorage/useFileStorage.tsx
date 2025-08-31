import axios from 'axios';
import {
  FileStorageDto,
  NewFileStorageDto,
  UseFilestorageProps,
  UseFilestorageReturn,
} from '@/hooks/useFileStorage/useFileStorage.core';
import { useRequest } from '@/hooks/useRequest/useRequest';
import fileDownload from 'js-file-download';
import { useCallback } from 'react';

export function useFilestorage({ path, storageUrl, onError }: UseFilestorageProps): UseFilestorageReturn {
  const { post, del, get } = useRequest({ baseURL: storageUrl });

  const uploadFile = useCallback(
    async (file: File): Promise<NewFileStorageDto | null> => {
      const formData = new FormData();
      formData.append('file', file);
      return post<NewFileStorageDto>(path ?? '/file', formData, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }).catch((e) => {
        onError(e);
        return null;
      });
    },
    [onError, path, post]
  );

  const deleteFile = useCallback(
    async (fileId: string): Promise<void> => {
      return del(`${path ?? '/file'}/${fileId}`).catch((e) => {
        onError(e);
      });
    },
    [del, onError, path]
  );

  const downloadFile = useCallback(
    async (fileId: string, fileName: string): Promise<void> => {
      try {
        const response = await get<FileStorageDto>(`${path ?? '/file'}/${fileId}`);
        const fileStream = await axios.get(response.signedUrl, { responseType: 'arraybuffer' });
        fileDownload(fileStream.data, fileName);
      } catch (e) {
        onError(e);
      }
    },
    [get, onError, path]
  );

  return {
    uploadFile,
    deleteFile,
    downloadFile,
  };
}
