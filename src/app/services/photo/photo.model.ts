export type PhotosRes = {
  total: number;
  lastPage: number;
  currentPage?: number;
  perPage?: number;
  photos: Photo[];
};

export type Photo = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
