import styled from 'styled-components';
import { useState, memo } from 'react';
import { ItemsVitualized } from '../../hooks/useSearch';
import { Link } from 'react-router';

export interface GridItemProps extends ItemsVitualized {
  x: number;
  y: number;
}

const GridItem: React.FC<GridItemProps> = ({
  id,
  width,
  height,
  src,
  alt,
  avg_color,
  x,
  y,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <GridItemContainer
      data-testid="grid-item-container"
      isLoading={isLoading}
      aspectRatio={width / height}
      bgColor={avg_color}
      x={x}
      y={y}
      width={width}
    >
      <Link to={`/${id}`}>
        <GridItemImage
          isLoading={isLoading}
          src={src.medium}
          alt={alt}
          onLoad={() => setIsLoading(false)}
        />
      </Link>
    </GridItemContainer>
  );
};

const GridItemContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isLoading', 'aspectRatio', 'bgColor', 'x', 'y', 'width'].includes(prop),
})<{
  isLoading: boolean;
  aspectRatio: number;
  bgColor: string;
  x: number;
  y: number;
  width: number;
}>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  z-index: 0;
  box-sizing: border-box;
  width: ${({ width }) => width}px;
  aspect-ratio: ${({ aspectRatio, isLoading }) =>
    isLoading ? aspectRatio : 'auto'};
  background-color: ${({ bgColor, isLoading }) =>
    isLoading ? bgColor : 'transparent'};
`;

const GridItemImage = styled.img.withConfig({
  shouldForwardProp: (prop) => !['isLoading'].includes(prop),
})<{ isLoading: boolean }>`
  display: block;
  width: 100%;
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

export default memo(GridItem);
