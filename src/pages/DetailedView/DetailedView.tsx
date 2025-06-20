import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchPexelsPhotoById, PexelsPhoto } from "../services/pexels";
import styled from "styled-components";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { PhotoMeta, PhotoMetaItemValue } from "./PhotoMeta";
import { ArrowLeftIcon } from "../../components/Icons/ArrowLeft";

const DetailedView = () => {
  const [image, setImage] = useState<PexelsPhoto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchPexelsPhotoById(Number(id)).then((data) => {
      setImage(data);
    }).catch((error) => {
      setError(error.message);
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  return (
    <Wrapper>
      <BackButton to="/">
        <ArrowLeftIcon />
      </BackButton>
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!loading && image && <ImageWrapper bgColor={image.avg_color} aspectRatio={image.width / image.height} height={image.height} width={image.width} href={image.url} target="_blank" rel="noopener noreferrer">
        <Image src={image.src.original} alt={image.alt} onLoad={() => setImageLoading(false)} imageLoading={imageLoading} />
      </ImageWrapper>}
      <PhotoMeta>
        <PhotoMetaItemValue href={image?.photographer_url} target="_blank" rel="noopener noreferrer">{image?.photographer}</PhotoMetaItemValue>
      </PhotoMeta>      
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 36px);
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 50px;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.a.withConfig({
  shouldForwardProp: (prop) => !['bgColor', 'aspectRatio', 'height', 'width'].includes(prop),
})<{ bgColor: string, aspectRatio: number, height: number, width: number }>`
  max-height: 60vh;
  max-width: 80vw;
  background-color: ${({ bgColor }) => bgColor};
  aspect-ratio: ${({ aspectRatio }) => aspectRatio};
  border-radius: 10px;
  height: ${({ height }) => window.innerHeight < window.innerWidth ? `${height}px` : 'auto'};
  width: ${({ width }) => window.innerHeight > window.innerWidth ? `${width}px` : 'auto'};
  `;

const Image = styled.img.withConfig({
  shouldForwardProp: (prop) => !['imageLoading'].includes(prop),
})<{ imageLoading: boolean }>`
  height: 100%;
  object-fit: contain;
  max-width: 100%;
  border-radius: 10px;
  opacity: ${({ imageLoading }) => imageLoading ? 0 : 1};
  transition: opacity 0.3s ease-in-out;
`;

export default DetailedView;