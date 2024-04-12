import { db } from '@/lib/db';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next/types';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const result = await db
    .selectFrom('article')
    .selectAll()
    .where('id', '=', Number(params.id))
    .execute();
  const articleDetail = result[0];
  return {
    title: articleDetail.title,
  };
}

/**
 * 文章详情
 */
export default async function Detail({ params }: Props) {
  const result = await db
    .selectFrom('article')
    .selectAll()
    .where('id', '=', Number(params.id))
    .execute();
  const articleDetail = result[0];
  return (
    <article>
      <header>
        <h2>{articleDetail.title}</h2>
        <div>
          <span className="mr-2">By</span>
          <Link className="mr-2" href="/">
            赵的拇指
          </Link>
          <span className="mr-2">At</span>
          <span className="mr-2">
            {dayjs(+articleDetail.created_at).format('YYYY-MM-DD')}
          </span>
          <span className="mr-2">In</span>
          <Link className="mr-2" href="/article/type/{{ articleDetail.type }}">
            {articleDetail.type}
          </Link>
          <span className="mr-2">Views</span>
          <span>{articleDetail.view_count}</span>
        </div>
      </header>

      <div dangerouslySetInnerHTML={{ __html: articleDetail.content_render }} />
    </article>
  );
}
