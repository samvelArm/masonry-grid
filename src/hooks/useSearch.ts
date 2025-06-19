import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchPexelsPhotos, PexelsPhoto } from '../pages/services/pexels';
import { getNextIndex } from '../utils';
import { COLUMN_GAP, COLUMN_WIDTH } from '../constants';
import { useResize } from './useResize';
import { useScroll } from './useScroll';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Map<number, PexelsPhoto>>(
    new Map<number, PexelsPhoto>()
  );
  const [moreItems, setMoreItems] = useState<boolean>(true);
  const { scrollPosition } = useScroll({ setPage });
  const { columns, windowWidth } = useResize();

  const getPexelsPhotos = useCallback(() => {
    if (!moreItems) {
      return;
    }
    setLoading(true);
    
    fetchPexelsPhotos({ perPage: 40, page, query })
      .then(({photos, next_page: nextPage}) => {
        setItems((items) => {
          const newItems = new Map(items);
          photos.forEach((photo: PexelsPhoto) => newItems.set(photo.id, photo));
          return newItems;
        });
        setMoreItems(!!nextPage);
      })
      .catch((error) => {
        setError(`Error fetching photos: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page, moreItems]);

  const calculatePlacment = useMemo(() => {
    
    const yMap = new Map<number, number>(Array.from({ length: columns }, (_, index) => [index, 0]));    

    const vitualizedItems = new Map(
      Array.from(items.entries()).map(([id, photo]) => {
        const {minCol, minY} = getNextIndex(yMap, columns);
        const xOffset = (windowWidth - columns * COLUMN_WIDTH - COLUMN_GAP * (columns - 1)) / 2;
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
  }, [items, columns, windowWidth]);

  // Virtualization logic
  const visibleItems = useMemo(() => {
    const buffer = 500; // Buffer zone in pixels
    const viewportTop = scrollPosition - buffer;
    const viewportBottom = scrollPosition + window.innerHeight + buffer;
    
    const visible = new Map<number, ItemsVitualized>();
    
    calculatePlacment.vitualizedItems.forEach((item, id) => {
      const itemTop = item.y;
      const itemBottom = item.y + item.height;
      
      // Check if item is visible in viewport
      if (itemBottom >= viewportTop && itemTop <= viewportBottom) {
        visible.set(id, item);
      }
    });
    
    return visible;
  }, [calculatePlacment.vitualizedItems, scrollPosition]);

  useEffect(() => {
    setItems(new Map<number, PexelsPhoto>());
    setPage(1);
    setMoreItems(true);
    setError(null);
  }, [query]);

  useEffect(() => {
    getPexelsPhotos();
  }, [getPexelsPhotos]);
  
  return { 
    items: visibleItems, 
    maxY: calculatePlacment.maxY, 
    loading, 
    error 
  };
};
