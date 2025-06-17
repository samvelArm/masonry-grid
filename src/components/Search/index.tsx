import React from 'react';
import styled from 'styled-components';

export interface SearchProps {
  query: string;
  onChange: (query: string) => void;
}

export const Search: React.FC<SearchProps> = ({ query, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    clearTimeout((handleChange as any).debounceTimeout);
    (handleChange as any).debounceTimeout = setTimeout(() => {
      onChange(query);
    }, 300);
  };

  return (
    <Input
      type="text"
      defaultValue={query}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
};

const Input = styled.input`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  justify-self: flex-end;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
