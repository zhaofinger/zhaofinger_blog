import Header from '../components/header';
import Footer from '../components/footer';
import PhotoGalleryClient, { Photo } from './components/PhotoGallery';

// Server component that fetches data
export default async function PhotoPage() {
  const { db } = await import('@/lib/db');

  const photos = await db
    .selectFrom('article')
    .selectAll()
    .orderBy('created_at desc')
    .where('is_delete', '=', 0)
    .where('is_publish', '=', 1)
    .where('is_photo', '=', 1)
    .execute() as Photo[];

  return (
    <>
      <Header />
      <div id="content">
        <PhotoGalleryClient photos={photos} />
      </div>
      <Footer />
    </>
  );
}
