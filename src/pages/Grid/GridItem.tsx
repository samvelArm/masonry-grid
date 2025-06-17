import styled from 'styled-components';
import { PexelsPhoto } from '../services/pexels';
import { useState } from 'react';

export interface GridItemProps extends PexelsPhoto {}

const GridItem: React.FC<GridItemProps> = ({
  width: imageWidth,
  height: imageHeight,
  src,
  alt,
  avg_color: avgColor,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <GridItemContainer
      isLoading={isLoading}
      aspectRatio={imageWidth / imageHeight}
      bgColor={avgColor}
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
}>`
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: ${({ aspectRatio, isLoading }) =>
    isLoading ? aspectRatio : 'auto'};
  background-color: ${({ bgColor, isLoading }) =>
    isLoading ? bgColor : 'none'};
`;

const GridItemImage = styled.img<{ isLoading: boolean }>`
  display: block;
  width: 100%;
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
`;

export default GridItem;
