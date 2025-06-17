const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY || '';
const PEXELS_API_URL = 'https://api.pexels.com/v1/';
export interface PexelsPhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSrc;
  alt: string;
}

export interface PexelsSearchResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  total_pages: number;
}

export interface PexelsSearchRequestParams {
  query: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  size?: 'large' | 'medium' | 'small';
  color?: string;
  locale?: string;
  page?: number;
  perPage?: number;
}

export const fetchPexelsPhotos = async (params: PexelsSearchRequestParams) => {
  if (!PEXELS_API_KEY) {
    throw new Error('Pexels API key is not set');
  }
  const response = await fetch(
    `${PEXELS_API_URL}search?query=${encodeURIComponent(
      params.query.trim() || 'cats'
    )}&page=${params.page}&per_page=${params.perPage}&orientation=portrait`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch photos from Pexels');
  }

  const data = await response.json();
  return data.photos;
};

export const fetchPexelsPhotoById = async (id: number) => {
  const response = await fetch(`${PEXELS_API_URL}photos/${id}`, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch photo from Pexels');
  }

  const data = await response.json();
  return data;
};
