import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchPexelsPhotoById, PexelsPhoto } from "../services/pexels";
import styled from "styled-components";
import { LoadingSpinner } from "../../components/LoadingSpinner";

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
      {!loading && image && <ImageWrapper bgColor={image.avg_color} aspectRatio={image.width / image.height} href={image.url} target="_blank" rel="noopener noreferrer">
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
  shouldForwardProp: (prop) => !['bgColor', 'aspectRatio'].includes(prop),
})<{ bgColor: string, aspectRatio: number }>`
  max-height: 60vh;
  max-width: 80vw;
  background-color: ${({ bgColor }) => bgColor};
  aspect-ratio: ${({ aspectRatio }) => aspectRatio};
  border-radius: 10px;
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

const ArrowLeftIcon = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default DetailedView;

const PhotoMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const PhotoMetaItemValue = styled.a`
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
