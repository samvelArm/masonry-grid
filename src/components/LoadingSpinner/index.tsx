import styled from 'styled-components';

export const LoadingSpinner = styled.div`
  width: 100%;
  height: 100%;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  &::after {
    content: '';
    border: 4px solid #ccc;
    border-top-color: #3498db;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
