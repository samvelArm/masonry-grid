import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchPexelsPhotos, PexelsPhoto } from '../pages/services/pexels';
import { getNextIndex, throttle } from '../utils';
import { COLUMN_GAP, COLUMN_WIDTH } from '../constants';

export interface SearchProps {
  query: string;
}

export interface ItemsVitualized extends PexelsPhoto {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SearchResult {
  items: Map<number, ItemsVitualized>;
  loading: boolean;
  error: string | null;
  maxY: number;
}

export const useSearch = ({ query }: SearchProps): SearchResult => {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<Map<number, PexelsPhoto>>(
    new Map<number, PexelsPhoto>()
  );
  const [columns, setColumns] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const getPexelsPhotos = useCallback(() => {
    setLoading(true);
    fetchPexelsPhotos({ perPage: 20, page, query })
      .then((photos) => {
        setItems((items) => {
          const newItems = new Map(items);
          photos.forEach((photo: PexelsPhoto) => newItems.set(photo.id, photo));
          return newItems;
        });
      })
      .catch((error) => {
        setError(`Error fetching photos: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    setItems(new Map<number, PexelsPhoto>());
    setPage(1);
    setError(null);
  }, [query]);

  useEffect(() => {
    getPexelsPhotos();

    const handleScroll = throttle(() => {
      setScrollPosition(window.scrollY);
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [getPexelsPhotos]);

  useEffect(() => {
    const handleResize = () => {
      setColumns(Math.floor(window.innerWidth / (COLUMN_WIDTH + COLUMN_GAP)));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculatePlacment = useMemo(() => {
    const yMap = new Map<number, number>(Array.from({ length: columns }, (_, index) => [index, 0]));    

    const vitualizedItems = new Map(
      Array.from(items.entries()).map(([id, photo]) => {
        const {minCol, minY} = getNextIndex(yMap, columns);
        const xOffset = (window.innerWidth - columns * COLUMN_WIDTH - COLUMN_GAP * (columns - 1)) / 2;
        const x = minCol * (COLUMN_WIDTH + COLUMN_GAP) + xOffset;
        const width = COLUMN_WIDTH;
        const height = photo.height * (width / photo.width);
        const y = minY;
        yMap.set(minCol, y + height + COLUMN_GAP);

        return [
        id,
        {
          ...photo,
          x,
          y,
          width,
          height,
        },
      ]})
    );
    const maxY = Math.max(...Array.from(yMap.values()));

    return {vitualizedItems, maxY};
  }, [items, columns]);
  
  return { items: calculatePlacment.vitualizedItems, maxY: calculatePlacment.maxY, loading, error };
};
