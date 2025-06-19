import styled from "styled-components";

export const PhotoMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const PhotoMetaItemValue = styled.a`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: #3498db;
  text-decoration: none;
  text-transform: capitalize;
  &:hover {
    text-decoration: underline;
  }
`;
