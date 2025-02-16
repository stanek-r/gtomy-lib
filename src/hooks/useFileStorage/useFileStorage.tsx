import axios from 'axios';
import {
  FileStorageDto,
  NewFileStorageDto,
  UseFilestorageProps,
  UseFilestorageReturn,
} from '@/hooks/useFileStorage/useFileStorage.core';
import { useGTomyContext } from '@/utils/GTomyProvider/useGTomyContext';
import { useRequest } from '@/hooks/useRequest/useRequest';
import fileDownload from 'js-file-download';

export function useFilestorage({ path, forceStorageUrl, onError }: UseFilestorageProps): UseFilestorageReturn {
  const gtomyContext = useGTomyContext();
  const baseURL = forceStorageUrl ?? gtomyContext?.storageUrl;
  const { post, delete: deleteRequest, get } = useRequest(baseURL);

  path ??= '/file';

  const uploadFile = async (file: File): Promise<NewFileStorageDto | null> => {
    const formData = new FormData();
    formData.append('file', file);
    return post<NewFileStorageDto>(path, formData, { maxContentLength: Infinity, maxBodyLength: Infinity })
      .then((file) => {
        return file;
      })
      .catch((e) => {
        onError(e);
        return null;
      });
  };

  const deleteFile = async (fileId: string): Promise<void> => {
    return deleteRequest(`${path}/${fileId}`).catch((e) => {
      onError(e);
    });
  };

  const downloadFile = async (fileId: string, fileName: string): Promise<void> => {
    try {
      const response = await get<FileStorageDto>(`${path}/${fileId}`);
      const fileStream = await axios.get(response.signedUrl, { responseType: 'arraybuffer' });
      fileDownload(fileStream.data, fileName);
    } catch (e) {
      onError(e);
    }
  };

  return {
    uploadFile,
    deleteFile,
    downloadFile,
  };
}
