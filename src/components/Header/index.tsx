import styled from 'styled-components';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <HeaderStyled>
      <Title>Masonry Grid</Title>
      <Link
        href="https://www.pexels.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Photos provided by Pexels
      </Link>
    </HeaderStyled>
  );
};

export default Header;

const HeaderStyled = styled.header`
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  background-color: #282c34;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 4px;
  box-sizing: border-box;

  @media (max-width: 700px) {
    justify-content: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0 0 0 4px;
`;

const Link = styled.a`
  position: absolute;
  right: 8px;
  color: #61dafb;
  text-decoration: none;
  font-size: 1rem;

  @media (max-width: 400px) {
    display: none;

  &:hover {
    text-decoration: underline;
  }
`;
