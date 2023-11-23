import PropTypes from 'prop-types'
import { Component } from 'react';
import { ModalW, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDownHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDownHandler);
  }
  keyDownHandler = e => {
    console.log(e.code);
    if (e.code === 'Escape') this.props.onClose();
  };
  render() {
    const { img, alt, onClose } = this.props;
    return createPortal(
      <Overlay onClick={onClose}>
        <ModalW>
          <img src={`${img}`} alt={`${alt}`} />
        </ModalW>
      </Overlay>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  img:PropTypes.string.isRequired,
  alt:PropTypes.string.isRequired,
  onClose:PropTypes.func.isRequired,
};