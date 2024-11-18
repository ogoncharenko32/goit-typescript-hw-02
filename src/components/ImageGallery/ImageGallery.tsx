import { Image } from '../../App';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { nanoid } from 'nanoid/non-secure';

type ImageGalleryParams = {
  images: Image[];
  onElementClick: (image: Image) => void;
};

const ImageGallery = ({ images, onElementClick }: ImageGalleryParams) => {
  return (
    <ul className={css.gallery}>
      {images.map((image: Image) => (
        <li
          key={nanoid()}
          onClick={() => {
            onElementClick(image);
          }}
        >
          <ImageCard
            imageSrc={image.urls.small}
            imageAlt={image.alt_description}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
