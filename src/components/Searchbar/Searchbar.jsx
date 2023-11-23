import PropTypes from 'prop-types';
import { Component } from 'react';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Some query needed');
      return;
    }
    this.props.onSubmit(this.state.query);
  };
  onChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };
  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton type="submit">
            <SearchIcon />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
            value={this.state.query}
            name="search"
          />
        </SearchForm>
      </Header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
