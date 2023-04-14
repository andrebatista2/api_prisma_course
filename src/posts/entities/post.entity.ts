import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: string;
  published: boolean;
  title: string;
  content: string | null;
  created_at: Date;
  updated_at: Date;
  author_id: string | null;
}
