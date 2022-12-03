import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  state = {
    largeImage: '',
    description: '',
  };

  componentDidMount() {
    const { largeImage, description } = this.props;
    if (largeImage) {
      this.setState({ largeImage, description });
    }
  }

  render() {
    const { smallImage, description, onClick } = this.props;

    return (
      <Item>
        <Image
          onClick={() => onClick(this.state)}
          src={smallImage}
          alt={description}
        />
      </Item>
    );
  }
}
