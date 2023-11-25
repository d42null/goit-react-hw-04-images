import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalW, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ img, alt, onClose }) => {
  useEffect(() => {
    const keyDownHandler = e => {
      if (e.code === 'Escape') onClose();
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalW>
        <img src={`${img}`} alt={`${alt}`} />
      </ModalW>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
