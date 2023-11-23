import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModal: false,
  };
  toggleModal = e => {
    if (!e || e.currentTarget === e.target) {
      this.setState(state => ({ isModal: !state.isModal }));
    }
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isModal } = this.state;
    return (
      <GalleryItem>
        <GalleryItemImage
          src={`${webformatURL}`}
          alt={`${tags}`}
          onClick={this.toggleModal}
        />
        {isModal && (
          <Modal img={largeImageURL} alt={tags} onClose={this.toggleModal} />
        )}
      </GalleryItem>
    );
  }
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
