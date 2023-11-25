import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { useState } from 'react';
export const App = () => {
  const [searchQ, setSearchQ] = useState('');
  const onSearchSubmit = query => setSearchQ(query);
  return (
    <>
      <Container>
        <Searchbar onSubmit={onSearchSubmit} />
        {searchQ && <ImageGallery searchQ={searchQ}></ImageGallery>}
      </Container>
    </>
  );
};
