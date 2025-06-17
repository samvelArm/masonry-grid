import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { fetchPexelsPhotos } from '../services/pexels';

interface GridProps {
  // Define any props if needed
}

const Grid = (props: GridProps) => {
  const getPexelsPhotos = useCallback(async () => {
    fetchPexelsPhotos({ query: 'nature', per_page: 10 })
      .then((photos) => {
        console.log('Fetched photos:', photos);
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  useEffect(() => {
    getPexelsPhotos();
  }, [getPexelsPhotos]);

  return (
    <Wrapper>
      <h1>Grid Page</h1>
      <p>This is the grid page content.</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  color: red;
`;

export default Grid;
