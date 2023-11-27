import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container, ErrorMsg } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { getImagesBySearchQuery } from 'services/pixabay-api';
import { useState, useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
const PER_PAGE = 12;
export const App = () => {
  const [searchQ, setSearchQ] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchQ === '') return;
    fetchData();
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getImagesBySearchQuery(searchQ, page);
        setHits(hits => [...hits, ...data.hits]);
        if (page === 1) {
          setTotalHits(data.totalHits);
          setError(!data.totalHits ? { message: 'No results' } : null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }, [page, searchQ]);
  const onSearchSubmit = query => {
    setSearchQ(query);
    setPage(1);
    setHits([]);
    setTotalHits(0);
    setError(null);
  };
  const onLoadMore = () => setPage(page => page + 1);
  return (
    <Container>
      <Searchbar onQuerySubmit={onSearchSubmit} />
      {searchQ && hits.length > 0 && <ImageGallery hits={hits} />}
      {error && <ErrorMsg>{error.message}</ErrorMsg>}
      <Loader visible={loading} />
      {totalHits > 0 && page * PER_PAGE < totalHits && !loading && (
        <Button onLoadMore={onLoadMore}></Button>
      )}
    </Container>
  );
};
