import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onQuerySubmit }) => {
  const [query, setQuery] = useState('');

  const onSearchSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Some query needed');
      return;
    }
    onQuerySubmit(query);
  };
  const onChange = e => setQuery(e.target.value.toLowerCase());

  return (
    <Header>
      <SearchForm onSubmit={onSearchSubmit}>
        <SearchFormButton type="submit">
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
  onQuerySubmit: PropTypes.func.isRequired,
};
