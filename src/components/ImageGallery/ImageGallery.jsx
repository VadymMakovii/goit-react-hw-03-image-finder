import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImages } from '../../services/pixabay-api';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ImageList } from './ImageGallery.styled';

export class ImageGallery extends Component {
  static propTypes = {
    request: PropTypes.string,
    page: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onFetchImages: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
    loadingMore: false,
  };

  async componentDidUpdate(prevProps) {
    const { request, page, onFetchImages } = this.props;
    console.log(prevProps.request !== request);

    if (prevProps.request !== request || prevProps.page !== page) {
      this.setState({
        loading: true,
        loadingMore: false,
      });

      try {
        const response = await getImages(request, page);

        response.hits.length < 1 &&
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );

        response.hits.length < response.total &&
          this.setState({ loadingMore: true });

        const results = response.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        onFetchImages(results);
      } catch (error) {
        toast.error(`${error.message}`);
      } finally {
        this.setState({ loading: false });
      }
      return;
    }

    if (page > 1) {
      window.scrollBy({ top: 560, behavior: 'smooth' });
    }
  }

  render() {
    const { loading, loadingMore } = this.state;
    const { onClick, images } = this.props;

    return (
      <>
        {images.length > 0 && (
          <ImageList>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                smallImage={webformatURL}
                largeImage={largeImageURL}
                description={tags}
              />
            ))}
          </ImageList>
        )}
        {loading && <Loader />}
        {loadingMore && <Button onClick={onClick} />}
      </>
    );
  }
}
