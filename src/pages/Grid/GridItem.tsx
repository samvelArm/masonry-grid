import styled from 'styled-components';
import { useState } from 'react';
import { ItemsVitualized } from '../../hooks/useSearch';

export interface GridItemProps extends ItemsVitualized {
  x: number;
  y: number;
}

const GridItem: React.FC<GridItemProps> = ({
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
      isLoading={isLoading}
      aspectRatio={width / height}
      bgColor={avg_color}
      x={x}
      y={y}
      width={width}
    >
      <GridItemImage
        isLoading={isLoading}
        src={src.medium}
        alt={alt}
        onLoad={() => setIsLoading(false)}
      />
    </GridItemContainer>
  );
};

const GridItemContainer = styled.div<{
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

const GridItemImage = styled.img<{ isLoading: boolean }>`
  display: block;
  width: 100%;
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

export default GridItem;
