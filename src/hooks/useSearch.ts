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
        setItems((items) => [...items, ...photos]);
      })
      .catch((error) => {
        setError(`Error fetching photos: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    setItems([]); // Reset items when query changes
    setPage(1); // Reset page when query changes
    setError(null); // Reset error when query changes
  }, [query]);

  useEffect(() => {
    getPexelsPhotos();

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [getPexelsPhotos]);

  return { items, loading, error };
};
