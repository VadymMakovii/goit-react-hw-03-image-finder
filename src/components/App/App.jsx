import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    request: '',
  };

  formSubmitHandler = ({ request }) => {
    if (this.state.request === request) {
      return toast.info(
        'Please enter a new request or continue browsing current images'
      );
    }
    this.setState({ request, page: 1, images: [] });
  };

  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getNewImages = newImages => {
    this.setState(({ images }) => ({ images: [...images, ...newImages] }));
  };

  render() {
    const { request, page, images } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery
          request={request}
          page={page}
          images={images}
          onClick={this.loadMoreClick}
          onFetchImages={this.getNewImages}
        />
        <ToastContainer
          position="top-left"
          autoClose={1000}
          theme="colored"
          pauseOnHover={true}
        />
      </Container>
    );
  }
}
