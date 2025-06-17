import { useState, useEffect, useCallback } from 'react';
import { fetchPexelsPhotos, PexelsPhoto } from '../pages/services/pexels';

export interface SearchProps {
  query: string;
}

export const useSearch = ({ query }: SearchProps) => {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPexelsPhotos = useCallback(() => {
    setLoading(true);
    fetchPexelsPhotos({ perPage: 100, page, query })
      .then((photos) => {
        if (photos && photos.length > 0) {
          setItems(photos);
        } else {
          setItems([]);
        }
      })
      .catch((error) => {
        setError(`Error fetching photos: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    getPexelsPhotos();
  }, [getPexelsPhotos]);

  return { items, loading, error };
};
