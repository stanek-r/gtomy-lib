export interface BlobstorageImage {
  id: string;
  filename: string;
  uploaded: string;
  requireSignedURLs: boolean;
  variants: string[];
  meta?: Record<string, object>;
}

export interface UseBlobstorageProps {
  onError: (error: unknown) => void;
  path?: string;
  storageUrl: string;
}

export interface UseBlobstorageReturn {
  uploadImage: (file: File) => Promise<BlobstorageImage | null>;
  deleteImage: (imageId?: string) => Promise<void>;
}
