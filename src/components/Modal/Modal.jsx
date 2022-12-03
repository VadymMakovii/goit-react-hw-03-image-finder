import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ImageBox, Overlay, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  state = {
    currentImage: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;

    bodyStyle.position = 'fixed';
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.left = '25px';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    const bodyStyle = document.body.style;
    const scrollY = bodyStyle.top;
    bodyStyle.position = '';
    bodyStyle.top = '';
    bodyStyle.left = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    e.currentTarget === e.target && this.props.onClose();
  };

  render() {
    const { url, description } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ImageBox>
          <Image src={url} alt={description} />
        </ImageBox>
      </Overlay>,
      modalRoot
    );
  }
}
