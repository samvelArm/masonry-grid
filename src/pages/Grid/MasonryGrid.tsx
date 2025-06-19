import React from 'react';
import styled from 'styled-components';
import GridItem from './GridItem';
import { ItemsVitualized } from '../../hooks/useSearch';

export interface MasonryGridProps {
  items: Map<number, ItemsVitualized>;
  error?: string | null;
  isLoading?: boolean;
  maxY: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  isLoading,
  error,
  maxY,
}) => {
  return (
    <Wrapper>
      <GridContainer height={maxY}>
        {!isLoading && (error || items.size === 0) ? (
          <NoResults>{error || 'No results found'}</NoResults>
        ) : (
          Array.from(items.values()).map((item) => (
            <GridItem key={item.id} {...item} />
          ))
        )}
      </GridContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: calc(100vh - 81px);
`;

const GridContainer = styled.div<{ height: number }>`
  padding: 16px;
  height: fit-content;
  width: 100vw;
  min-height: calc(100vh - 113px);
  position: relative;
  box-sizing: border-box;
  overflow-y: auto;
  height: ${({ height }) => height}px;
`;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  color: #888;
  font-size: 1.2rem;
  text-wrap: nowrap;
  box-sizing: border-box;
`;

export default MasonryGrid;

