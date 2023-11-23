import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Component } from 'react';
export class App extends Component {
  state = {
    searchQ: '',
  };
  onSearchSubmit = query => {
    this.setState({ searchQ: query });
  };
  render() {
    return (
      <>
        <Container>
          <Searchbar onSubmit={this.onSearchSubmit} />
          {this.state.searchQ && (
            <ImageGallery searchQ={this.state.searchQ}></ImageGallery>
          )}
        </Container>
      </>
    );
  }
}
