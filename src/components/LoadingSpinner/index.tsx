import styled from 'styled-components';

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  &::after {
    content: '';
    border: 2px solid #ccc;
    border-top-color: #3498db;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
