import { db } from '@/lib/db';
import Link from 'next/link';
import Header from '../components/header';
import dayjs from 'dayjs';
import Footer from '../components/footer';

/**
 * 文章列表
 */
export default async function Article() {
  const articleList = await db
    .selectFrom('article')
    .selectAll()
    .orderBy('created_at desc')
    .where('is_delete', '=', 0)
    .where('is_publish', '=', 1)
    .where('is_film', '=', 0)
    .execute();

  return (
    <>
      <Header />
      <ul className="article-list">
        {articleList.map((item) => (
          <li key={item.id} className="article-item">
            <span className="date">
              {dayjs(+item.created_at).format('YYYY-MM-DD')}
            </span>
            <Link className="title-content" href={`/detail/${item.id}`}>
              <h2 className="title">
                {item.is_photo ? '[摄影]' : ''}
                {item.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  );
}
