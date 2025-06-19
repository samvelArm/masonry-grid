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
  padding: 8px 12px;
  border: 2px solid #e3f2fd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  justify-self: flex-end;
  background-color: #f8fbff;
  color: #1976d2;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #90caf9;
  }

  &:focus {
    border-color: #42a5f5;
    background-color: #ffffff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.1);
  }

  &:hover {
    border-color: #90caf9;
    background-color: #ffffff;
  }
`;
