type ImageCardParams = {
  imageSrc: string;
  imageAlt: string;
};

const ImageCard = ({ imageSrc, imageAlt }: ImageCardParams) => {
  return (
    <div>
      <img src={imageSrc} alt={imageAlt} width="400px" height="266px" />
    </div>
  );
};

export default ImageCard;
