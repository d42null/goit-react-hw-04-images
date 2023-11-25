import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { ErrorMsg, Gallery } from './ImageGallery.styled';
import { getImagesBySearchQuery } from 'services/pixabay-api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
const PER_PAGE = 12;
export const ImageGallery = ({ searchQ }) => {
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const didMount = useRef(false);
  useEffect(() => {
    setPage(1);
    setHits([]);
    setTotalHits(0);
    setError(null);
  }, [searchQ]);
  useEffect(() => {
    // if (searchQ === '') return;
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const fetchData = async () => {
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
    };
    setLoading(true);
    fetchData();
  }, [page, searchQ]);
  const onLoadMore = e => setPage(page => page + 1);
  return (
    <>
      <Gallery>
        {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        ))}
      </Gallery>
      {error && <ErrorMsg>{error.message}</ErrorMsg>}
      <Loader visible={loading} />
      {totalHits > 0 && page * PER_PAGE < totalHits && !loading && (
        <Button onLoadMore={onLoadMore}></Button>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  searchQ: PropTypes.string.isRequired,
};
