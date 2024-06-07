import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import { db } from '@/lib/db';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next/types';

import './markdown.css';
import './prism.css';
import { prefixImgUrl } from '@/lib/img';

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
    <>
      <article id="detail">
        <header>
          <h2 className="article-title">{articleDetail.title}</h2>
          <div className="article-meta">
            <span>By</span>
            <Link className="author" href="/">
              赵的拇指
            </Link>
            <span>At</span>
            <span className="datetime">
              {dayjs(+articleDetail.created_at).format('YYYY-MM-DD')}
            </span>
            <span>Views</span>
            <span className="views">{articleDetail.view_count}</span>
          </div>
        </header>

        {articleDetail.is_photo ? (
          <div className="article-content photo-content">
            <p className="photo-desc">{articleDetail.desc}</p>
            {articleDetail.content_render.split('||').map((imgItem) => (
              <img key={imgItem} src={prefixImgUrl(imgItem)} loading="lazy" />
            ))}
          </div>
        ) : (
          <div
            className="article-content markdown-body"
            dangerouslySetInnerHTML={{ __html: articleDetail.content_render }}
          />
        )}
        <ul className="article-label-list">
          <span className="label-title">标签：</span>
          {articleDetail.label.split(' ').map((labelItem) => (
            <li key={labelItem}>#{labelItem}</li>
          ))}
        </ul>
      </article>
      <Footer />
    </>
  );
}
