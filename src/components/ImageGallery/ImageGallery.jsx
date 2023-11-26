import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { ErrorMsg, Gallery } from './ImageGallery.styled';
import { getImagesBySearchQuery } from 'services/pixabay-api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
const PER_PAGE = 12;
export const ImageGallery = ({ searchQ, page, onLoadMore }) => {
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (page === 1) {
      setHits([]);
      setTotalHits(0);
      setError(null);
    }
    const fetchData = async () => {
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
    };
    fetchData();
  }, [page, searchQ]);

  return (
    <>
      {hits.length > 0 && (
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
      )}
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
  page: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
