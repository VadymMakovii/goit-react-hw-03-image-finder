import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    request: '',
    showGallery: false,
  };

  componentDidUpdate(__, prevState) {
    if (this.state.request !== prevState.request) {
      this.setState({ showGallery: true });
    }
  }

  formSubmitHandler = ({ request }) => {
    this.setState({ request, showGallery: false });
  };

  render() {
    const { request, showGallery } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {showGallery && <ImageGallery request={request} />}
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
