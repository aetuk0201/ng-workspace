export interface IPhoto {
  photoId: string;
  albumId: string;
  photoName?: string;
  title?: string;
  description?: string;
  file?: File;
  mimeType?: string;
  urlLink: string;
  createdAt?: String;
  updatedAt?: String;
}
