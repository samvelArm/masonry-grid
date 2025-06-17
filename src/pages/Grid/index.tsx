import { useState } from 'react';
import styled from 'styled-components';
import MasonryGrid from './MasonryGrid';
import { useSearch } from '../../hooks/useSearch';
import { Search } from '../../components/Search';

interface GridProps {
  // Define any props if needed
}

const Grid = (props: GridProps) => {
  const [query, setQuery] = useState<string>('');
  const { items, loading, error } = useSearch({ query });

  return (
    <Wrapper>
      <SearchWrapper>
        <Search query={query} onChange={setQuery} />
      </SearchWrapper>
      <MasonryGrid items={items} isLoading={loading} error={error} />
    </Wrapper>
  );
};

const SearchWrapper = styled.div`
  position: sticky;
  top: 36px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 8px;
  background-color: #f0f0f0;
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
