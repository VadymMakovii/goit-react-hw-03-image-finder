import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Button, Form, Input } from './SearchForm.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export class SerchForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    request: '',
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.state.request.trim() !== ''
      ? this.props.onSubmit(this.state)
      : toast('Please enter your request');
  };

  handleChangeInput = e => {
    this.setState({ request: e.currentTarget.value });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmitForm}>
        <Button type="submit" aria-label="Search images">
          <AiOutlineSearch size={20} title="Search" />
        </Button>
        <Input
          onChange={this.handleChangeInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    );
  }
}
