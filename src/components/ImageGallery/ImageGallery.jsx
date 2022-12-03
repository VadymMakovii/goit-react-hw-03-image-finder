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
    page: null,
    images: null,
    request: '',
    loading: false,
    loadingMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const userRequest = this.props.request;
    const currentPage = this.state.page;
    const nextImages = this.state.images;

    if (prevRequest !== userRequest) {
      this.setState({
        page: 1,
        images: null,
        request: userRequest,
        loading: true,
        loadingMore: false,
      });

      try {
        const response = await getImages(userRequest);
        const result = response.hits;
        const totalHits = response.total;

        this.setState({ images: result });
        result.length < 1 &&
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        if (result.length < totalHits) {
          this.setState({ loadingMore: true });
        }
      } catch (error) {
        this.setState({ error });
        toast.error(`${error.message}`);
      } finally {
        this.setState({ loading: false });
      }
      return;
    }

    if (prevState.page !== currentPage && currentPage > 1) {
      this.setState({ loading: true, loadingMore: false });
      try {
        const response = await addImages(userRequest, currentPage);
        const newImages = response.hits;
        const totalHits = response.total;

        this.setState(({ images }) => ({ images: [...images, ...newImages] }));
        if (newImages.length < totalHits) {
          this.setState({ loadingMore: true });
        }
      } catch (error) {
        this.setState({ error });
        toast.error(`${error.message}`);
      } finally {
        this.setState({ loading: false });
      }
    }

    if (prevState.images && prevState.images !== nextImages) {
      window.scrollBy({ top: 600, behavior: 'smooth' });
    }
  }

  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, loadingMore } = this.state;

    return (
      <>
        <ImageList>
          {images &&
            images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                smallImage={webformatURL}
                largeImage={largeImageURL}
                description={tags}
              />
            ))}
        </ImageList>
        {loading && <Loader />}
        {loadingMore && <Button onClick={this.loadMoreClick} />}
      </>
    );
  }
}
