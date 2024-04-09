import { Generated, ColumnType } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';

export interface ArticleTable {
  id: Generated<number>;
  type: number;
  title: string;
  desc: string;
  label: string;
  cover: string;
  content_md: string;
  content_render: string;
  is_publish: number;
  rank: number;
  view_count: number;
  is_delete: number;
  is_photo: number;
  is_film: number;
  external_link: string;
  created_at: number;
  updated_at: number;
}

// Keys of this interface are table names.
export interface Database {
  article: ArticleTable
}

export const db = createKysely<Database>();
export { sql } from 'kysely';
