import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { smallImage, largeImage, description } = this.props;
    const { showModal } = this.state;

    return (
      <Item>
        <Image onClick={this.toggleModal} src={smallImage} alt={description} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={description} />
          </Modal>
        )}
      </Item>
    );
  }
}
