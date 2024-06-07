import { db } from '@/lib/db';
import Link from 'next/link';
import Header from '../components/header';
import dayjs from 'dayjs';
import Footer from '../components/footer';
import { prefixImgUrl } from '@/lib/img';

/**
 * 文章列表
 */
export default async function Article() {
  const filmList = await db
    .selectFrom('article')
    .selectAll()
    .orderBy('created_at desc')
    .where('is_delete', '=', 0)
    .where('is_publish', '=', 1)
    .where('is_film', '=', 1)
    .execute();

  return (
    <>
      <Header />
      <div id="film">
        <div className="time-line"></div>
        <ul className="film-list">
          {filmList.map((filmItem) => (
            <li key={filmItem.id} className="film-item">
              <span className="time">
                {dayjs(+filmItem.created_at).format('YYYY-MM-DD')}
              </span>
              <img
                className="cover"
                src={prefixImgUrl(filmItem.cover)}
                alt={filmItem.title}
                loading="lazy"
              />
              <div className="desc">
                <h2>{filmItem.title}</h2>
                <p className="comment">{filmItem.desc}</p>
                <a
                  href="{{ item.external_link }}"
                  className="douban"
                  target="_blank"
                >
                  豆瓣
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}
