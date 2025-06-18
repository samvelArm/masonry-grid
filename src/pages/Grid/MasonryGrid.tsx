import React from 'react';
import styled from 'styled-components';
import GridItem from './GridItem';
import { PexelsPhoto } from '../services/pexels';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export interface MasonryGridProps {
  items: PexelsPhoto[];
  error?: string | null;
  isLoading?: boolean;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  isLoading,
  error,
}) => {
  return (
    <Wrapper>
      <GridContainer>
        {!isLoading && (error || items.length === 0) ? (
          <NoResults>{error || 'No results found'}</NoResults>
        ) : (
          items.map((item) => <GridItem key={item.id} {...item} />)
        )}
      </GridContainer>
      {isLoading && <LoadingSpinner />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: calc(100vh - 81px);
`;

const GridContainer = styled.div`
  padding: 16px;
  column-count: 10;
  row-gap: 16px;
  height: fit-content;
  min-height: calc(100vh - 113px);
  position: relative;
  @media (max-width: 1800px) {
    column-count: 9;
  }
  @media (max-width: 1600px) {
    column-count: 8;
  }
  @media (max-width: 1400px) {
    column-count: 7;
  }
  @media (max-width: 1200px) {
    column-count: 6;
  }
  @media (max-width: 1000px) {
    column-count: 5;
  }
  @media (max-width: 800px) {
    column-count: 4;
  }
  @media (max-width: 600px) {
    column-count: 3;
  }
  @media (max-width: 400px) {
    column-count: 2;
  }
  @media (max-width: 300px) {
    column-count: 1;
  }
`;

const NoResults = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #888;
  font-size: 1.2rem;
  text-wrap: nowrap;
  box-sizing: border-box;
`;

export default MasonryGrid;
