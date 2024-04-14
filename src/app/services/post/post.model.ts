export type PostsRes = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  posts: Post[];
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: Date;
  likeCount: number;
  views: number;
  shareCount: number;
};
