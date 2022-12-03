import PropTypes from 'prop-types';
import { SerchForm } from 'components/SearchForm/SearchForm';
import { Wrapper } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Wrapper>
      <SerchForm onSubmit={onSubmit} />
    </Wrapper>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
