import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { Image } from '../../App';

type ImageModalParams = {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image;
};

const ImageModal = ({ isOpen, onRequestClose, image }: ImageModalParams) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  console.log(image);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Image'}
        width="100%"
      />
      <div>
        <ul className={css.infoList}>
          <li className={css.listElem}>
            <p>Author: {image.user.name}</p>
          </li>
          <li className={css.listElem}>
            <p>Likes: {image.likes}</p>
          </li>
          <li className={css.listElem}>
            <p>Description: {image.alt_description}</p>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default ImageModal;
