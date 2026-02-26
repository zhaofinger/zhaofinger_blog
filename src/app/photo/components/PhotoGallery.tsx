'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import { prefixImgUrl } from '@/lib/img';

export interface Photo {
  id: number;
  title: string;
  cover: string;
  content_render: string;
  desc: string;
  created_at: number;
}

export interface PhotoItem {
  id: number;
  title: string;
  desc: string;
  cover: string;
  images: string[];
  createdAt: string;
  imageCount: number;
}

interface PhotoCardProps {
  photo: PhotoItem;
  onClick: (photo: PhotoItem, index: number) => void;
  columnWidth: number;
}

// Masonry grid item component
function PhotoCard({ photo, onClick, columnWidth }: PhotoCardProps) {
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculate aspect ratio when image loads
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setAspectRatio(img.naturalWidth / img.naturalHeight);
    setIsLoaded(true);
  };

  // Calculate height based on aspect ratio
  const height = Math.round(columnWidth / aspectRatio);

  return (
    <div
      className="photo-card mb-4 break-inside-avoid"
      style={{ marginBottom: '16px' }}
    >
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100"
        style={{ height: `${height}px`, minHeight: '200px' }}
        onClick={() => onClick(photo, 0)}
      >
        {/* Image */}
        <img
          src={prefixImgUrl(photo.cover)}
          alt={photo.title}
          className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
        />

        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Multi-image indicator */}
        {photo.imageCount > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {photo.imageCount}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-base font-medium mb-1 line-clamp-2">
              {photo.title}
            </h3>
            <p className="text-xs text-white/80">{photo.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LightboxProps {
  photo: PhotoItem | null;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

// Lightbox component
function Lightbox({
  photo,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !photo) return null;

  const currentImage = photo.images[currentIndex] || photo.cover;
  const hasMultipleImages = photo.images.length > 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Navigation arrows */}
      {hasMultipleImages && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Image container */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <img
          src={prefixImgUrl(currentImage)}
          alt={photo.title}
          className={`max-w-full max-h-[85vh] object-contain rounded-lg ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
        />

        {/* Image info */}
        <div className="mt-4 text-center text-white">
          <h3 className="text-lg font-medium">{photo.title}</h3>
          <p className="text-sm text-white/60 mt-1">
            {photo.createdAt}
            {hasMultipleImages && (
              <span className="ml-2">
                ({currentIndex + 1} / {photo.images.length})
              </span>
            )}
          </p>
        </div>

        {/* Thumbnail navigation for multiple images */}
        {hasMultipleImages && photo.images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {photo.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  // Use parent to handle index change
                  if (idx < currentIndex) {
                    for (let i = idx; i < currentIndex; i++) onPrev();
                  } else if (idx > currentIndex) {
                    for (let i = currentIndex; i < idx; i++) onNext();
                  }
                }}
                className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-white'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={prefixImgUrl(img)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface PhotoGalleryClientProps {
  photos: Photo[];
}

// Client component with all interactivity
export default function PhotoGalleryClient({ photos }: PhotoGalleryClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<PhotoItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [columnCount, setColumnCount] = useState(3);
  const [columnWidth, setColumnWidth] = useState(380);

  // Process photo data
  const processedPhotos: PhotoItem[] = useMemo(() => {
    return photos.map((photo) => {
      const images = photo.content_render
        ? photo.content_render.split('||').filter(Boolean)
        : [photo.cover];

      return {
        id: photo.id,
        title: photo.title,
        desc: photo.desc,
        cover: photo.cover,
        images: images.length > 0 ? images : [photo.cover],
        createdAt: dayjs(photo.created_at).format('YYYY-MM-DD'),
        imageCount: images.length,
      };
    });
  }, [photos]);

  // Handle responsive columns
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(1);
      } else if (width < 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Calculate column width based on container
  useEffect(() => {
    const updateWidth = () => {
      const width = Math.min(1200, window.innerWidth - 32);
      const gap = 16;
      setColumnWidth((width - gap * (columnCount - 1)) / columnCount);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [columnCount]);

  // Distribute photos into columns for masonry layout
  const columns = useMemo(() => {
    const cols: PhotoItem[][] = Array.from({ length: columnCount }, () => []);
    const colHeights = new Array(columnCount).fill(0);

    processedPhotos.forEach((photo) => {
      // Find shortest column
      const shortestCol = colHeights.indexOf(Math.min(...colHeights));
      cols[shortestCol].push(photo);
      // Approximate height (we'll refine this after images load)
      colHeights[shortestCol] += 300;
    });

    return cols;
  }, [processedPhotos, columnCount]);

  const openLightbox = useCallback((photo: PhotoItem, index: number) => {
    setCurrentPhoto(photo);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrev = useCallback(() => {
    if (!currentPhoto) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentPhoto.images.length - 1 : prev - 1
    );
  }, [currentPhoto]);

  const goToNext = useCallback(() => {
    if (!currentPhoto) return;
    setCurrentImageIndex((prev) =>
      prev === currentPhoto.images.length - 1 ? 0 : prev + 1
    );
  }, [currentPhoto]);

  return (
    <>
      <div className="photo-gallery">
        {/* Gallery title */}
        <div className="gallery-header mb-8">
          <h1 className="text-2xl font-light text-gray-800 mb-2">摄影作品</h1>
          <p className="text-sm text-gray-500">
            共 {processedPhotos.length} 个相册
          </p>
        </div>

        {/* Masonry grid */}
        <div className="flex gap-4">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-4">
              {column.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={openLightbox}
                  columnWidth={columnWidth}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        photo={currentPhoto}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  );
}
