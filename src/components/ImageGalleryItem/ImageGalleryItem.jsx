import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = e => {
    if (!e || e.currentTarget === e.target) setIsModal(!isModal);
  };
  return (
    <GalleryItem>
      <GalleryItemImage
        src={`${webformatURL}`}
        alt={`${tags}`}
        onClick={toggleModal}
      />
      {isModal && (
        <Modal img={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
