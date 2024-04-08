import { db } from '@/lib/db';
import Link from 'next/link';


/**
 * 文章列表
 */
export default async function Article() {
  const articleList = await db
    .selectFrom('article')
    .selectAll()
    .where('is_publish', '=', 1)
    .where('is_film', '=', 0)
    .execute();

  return (<ul>
    {
      articleList.map(item => <li key={item.id}> 
        <Link href={`/detail/${item.id}`}>{item.title}</Link>
        </li>
        )
    }
  </ul>);
}
