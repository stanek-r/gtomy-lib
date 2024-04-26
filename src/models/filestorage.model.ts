export interface FileStorageDto extends NewFileStorageDto {
  signedUrl: string;
}

export interface NewFileStorageDto {
  fileId: string;
  fileName: string;
  createdAt: string;
}
