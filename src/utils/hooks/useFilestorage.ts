import axios from 'axios';
import fileDownload from 'js-file-download';
import { useRequest } from '@/utils/hooks/useRequest';
import { useState } from 'react';
import { FileStorageDto, NewFileStorageDto } from '@/models/filestorage.model';
import { config } from '@/config';

export interface UseFilestorageReturn {
  error: any | null;
  uploadFile: (file: File) => Promise<NewFileStorageDto | null>;
  deleteFile: (fileId: string) => Promise<void>;
  downloadFile: (fileId: string, fileName: string) => Promise<void>;
}

export function useFilestorage(path = '/storage/file', baseURL = config.storageUrl): UseFilestorageReturn {
  const { post, delete: deleteRequest, get } = useRequest(baseURL);
  const [error, setError] = useState<any | null>();

  const uploadFile = async (file: File): Promise<NewFileStorageDto | null> => {
    const formData = new FormData();
    formData.append('file', file);
    return post<NewFileStorageDto>(path, formData)
      .then((file) => {
        setError(null);
        return file;
      })
      .catch((e) => {
        setError(e);
        return null;
      });
  };

  const deleteFile = async (fileId: string): Promise<void> => {
    return deleteRequest(`${path}/${fileId}`)
      .then(() => {
        setError(null);
      })
      .catch((e) => {
        setError(e);
      });
  };

  const downloadFile = async (fileId: string, fileName: string): Promise<void> => {
    try {
      const response = await get<FileStorageDto>(`${path}/${fileId}`);
      const fileStream = await axios.get<any>(response.signedUrl, { responseType: 'arraybuffer' });
      fileDownload(fileStream.data, fileName);
      setError(null);
    } catch (e) {
      setError(e);
    }
  };

  return {
    error,
    uploadFile,
    deleteFile,
    downloadFile,
  };
}
