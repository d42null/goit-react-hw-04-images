import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onSearchSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Some query needed');
      return;
    }
    onSubmit(query);
  };
  const onChange = e => setQuery(e.target.value.toLowerCase());

  return (
    <Header>
      <SearchForm onSubmit={onSearchSubmit}>
        <SearchFormButton type="submit">
          <SearchIcon />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          value={query}
          name="search"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
