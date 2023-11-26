import PropTypes from 'prop-types';
import { ErrorMsg, Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
const PER_PAGE = 12;
export const ImageGallery = ({
  page,
  hits,
  loading,
  error,
  totalHits,
  onLoadMore,
}) => (
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
ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  totalHits: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  error: PropTypes.object,
};
