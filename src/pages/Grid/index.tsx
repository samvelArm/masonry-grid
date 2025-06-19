import { useState } from 'react';
import styled from 'styled-components';
import MasonryGrid from './MasonryGrid';
import { useSearch } from '../../hooks/useSearch';
import { Search } from '../../components/Search';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface GridProps {
  // Define any props if needed
}

const Grid = (props: GridProps) => {
  const [query, setQuery] = useState<string>('');
  const { items, loading, error, maxY } = useSearch({ query });

  return (
    <Wrapper>
      <SearchWrapper>
        {loading && <LoadingSpinner />}
        <Search query={query} onChange={setQuery} />
      </SearchWrapper>
      <MasonryGrid items={items} isLoading={loading} error={error} maxY={maxY} />
    </Wrapper>
  );
};

const SearchWrapper = styled.div`
  position: sticky;
  top: 36px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 8px;
  background-color: #282c34;
  z-index: 1;
`;

const Wrapper = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
`;

export default Grid;
