import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { useState } from 'react';
export const App = () => {
  const [searchQ, setSearchQ] = useState('');
  const [page, setPage] = useState(1);
  const onSearchSubmit = query => {
    setSearchQ(query);
    setPage(1);
  };
  const onLoadMore = () => setPage(page => page + 1);
  return (
    <>
      <Container>
        <Searchbar onSubmit={onSearchSubmit} />
        {searchQ && (
          <ImageGallery
            searchQ={searchQ}
            page={page}
            onLoadMore={onLoadMore}
          ></ImageGallery>
        )}
      </Container>
    </>
  );
};
