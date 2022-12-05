import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImages, addImages } from '../../services/pixabay-api';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ImageList } from './ImageGallery.styled';

export class ImageGallery extends Component {
  static propTypes = {
    request: PropTypes.string,
  };

  state = {
    page: 1,
    images: [],
    request: '',
    loading: false,
    loadingMore: false,
  };

  async componentDidMount() {
    const userRequest = this.props.request;

    this.setState({
      request: userRequest,
      loading: true,
    });

    try {
      const response = await getImages(userRequest);
      const results = response.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );

      this.setState({ images: results });
      results.length < 1 &&
        toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      if (results.length < response.total) {
        this.setState({ loadingMore: true });
      }
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      this.setState({ loading: false });
    }
  }

  async componentDidUpdate(__, prevState) {
    const { request, page } = this.state;

    if (prevState.page !== page) {
      this.setState({ loading: true, loadingMore: false });

      try {
        const response = await addImages(request, page);
        const newImages = response.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        this.setState(({ images }) => ({ images: [...images, ...newImages] }));
        if (newImages.length < response.total) {
          this.setState({ loadingMore: true });
        }
      } catch (error) {
        toast.error(`${error.message}`);
      } finally {
        this.setState({ loading: false });
      }
    }

    if (page > 1) {
      window.scrollBy({ top: 560, behavior: 'smooth' });
    }
  }

  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, loadingMore } = this.state;

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
        {loadingMore && <Button onClick={this.loadMoreClick} />}
      </>
    );
  }
}
