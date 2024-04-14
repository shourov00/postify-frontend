import { Album } from '@services/album/album.model';
import { Post } from '@services/post/post.model';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  albums?: Album[];
  posts?: Post[];
};
