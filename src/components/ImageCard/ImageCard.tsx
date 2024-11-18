type ImageCardParams = {
  imageSrc: string;
  imageAlt: string | null;
};

const ImageCard = ({ imageSrc, imageAlt }: ImageCardParams) => {
  return (
    <div>
      <img
        src={imageSrc}
        alt={imageAlt || 'Image'}
        width="400px"
        height="266px"
      />
    </div>
  );
};

export default ImageCard;
