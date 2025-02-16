export interface FileStorageDto extends NewFileStorageDto {
  signedUrl: string;
}

export interface NewFileStorageDto {
  fileId: string;
  fileName: string;
  createdAt: string;
}

export interface UseFilestorageProps {
  onError: (error: unknown) => void;
  path: string;
  forceStorageUrl?: string;
}

export interface UseFilestorageReturn {
  uploadFile: (file: File) => Promise<NewFileStorageDto | null>;
  deleteFile: (fileId: string) => Promise<void>;
  downloadFile: (fileId: string, fileName: string) => Promise<void>;
}
