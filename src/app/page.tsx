import { db } from '@/lib/db';


export default async function Home() {
  const articleList = await db.selectFrom('article').selectAll().execute();

  return (<ul>
    {
      articleList.map(item => <li key={item.id}>{item.title}</li>)
    }
  </ul>);
}
