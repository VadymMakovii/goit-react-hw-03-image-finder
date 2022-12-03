import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    request: null,
  };

  formSubmitHandler = ({ request }) => {
    this.setState({ request });
  };

  render() {
    const { request } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery request={request} />
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
