import axios from 'axios';
import fileDownload from 'js-file-download';
import { useRequest } from '@/utils/hooks/useRequest';
import { useCallback, useMemo, useState } from 'react';
import { FileStorageDto, NewFileStorageDto } from '@/models/filestorage.model';
import { useConfig } from '@/utils/config/context';

export interface UseFilestorageReturn {
  error: any | null;
  uploadFile: (file: File) => Promise<NewFileStorageDto | null>;
  deleteFile: (fileId: string) => Promise<void>;
  downloadFile: (fileId: string, fileName: string) => Promise<void>;
}

export function useFilestorage(path = '/file', forceStorageUrl?: string): UseFilestorageReturn {
  const { storageUrl } = useConfig();
  const baseURL = useMemo(() => forceStorageUrl ?? storageUrl, [forceStorageUrl, storageUrl]);
  const { post, delete: deleteRequest, get } = useRequest(baseURL);
  const [error, setError] = useState<any | null>();

  const uploadFile = useCallback(
    async (file: File): Promise<NewFileStorageDto | null> => {
      const formData = new FormData();
      formData.append('file', file);
      return post<NewFileStorageDto>(path, formData, { maxContentLength: Infinity, maxBodyLength: Infinity })
        .then((file) => {
          setError(null);
          return file;
        })
        .catch((e) => {
          setError(e);
          return null;
        });
    },
    [post, path, setError]
  );

  const deleteFile = useCallback(
    async (fileId: string): Promise<void> => {
      return deleteRequest(`${path}/${fileId}`)
        .then(() => {
          setError(null);
        })
        .catch((e) => {
          setError(e);
        });
    },
    [path, deleteRequest, setError]
  );

  const downloadFile = useCallback(
    async (fileId: string, fileName: string): Promise<void> => {
      try {
        const response = await get<FileStorageDto>(`${path}/${fileId}`);
        const fileStream = await axios.get<any>(response.signedUrl, { responseType: 'arraybuffer' });
        fileDownload(fileStream.data, fileName);
        setError(null);
      } catch (e) {
        setError(e);
      }
    },
    [path, setError]
  );

  return {
    error,
    uploadFile,
    deleteFile,
    downloadFile,
  };
}
