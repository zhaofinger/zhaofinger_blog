import { db } from '@/lib/db';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import { prefixImgUrl } from '@/lib/img';

/**
 * 摄影列表
 */
export default async function Photo() {
  const photoList = await db
    .selectFrom('article')
    .selectAll()
    .orderBy('created_at desc')
    .where('is_delete', '=', 0)
    .where('is_publish', '=', 1)
    .where('is_photo', '=', 1)
    .execute();

  return (
    <>
      <Header />
      <div id="photo">
        <ul className="photo-list">
          {photoList.map((photoItem) => (
            <li key={photoItem.id} className="photo-item">
              <Link href={`/detail/${photoItem.id}`}>
                <div className="img-wrapper">
                  <img
                    src={prefixImgUrl(photoItem.cover)}
                    alt={photoItem.title}
                    loading="lazy"
                  />
                </div>
                <h3 className="title">{photoItem.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}
