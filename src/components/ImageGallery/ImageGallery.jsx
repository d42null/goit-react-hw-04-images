import PropTypes from 'prop-types';
import { Component } from 'react';
import { ErrorMsg, Gallery } from './ImageGallery.styled';
import { getImagesBySearchQuery } from 'services/pixabay-api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
const PER_PAGE = 12;
export class ImageGallery extends Component {
  state = {
    hits: [],
    loading: false,
    totalHits: 0,
    page: 1,
    error: null,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQ !== this.props.searchQ) {
      this.setState({ loading: true, hits: [], totalHits: 0, error: null });
      try {
        const data = await getImagesBySearchQuery(this.props.searchQ);

        this.setState({
          hits: data.hits,
          totalHits: data.totalHits,
          page: 1,
          error: data.totalHits === 0 ? { message: 'No results' } : null,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
    if (this.state.page > 1 && prevState.page !== this.state.page) {
      this.setState({ loading: true });
      try {
        const data = await getImagesBySearchQuery(
          this.props.searchQ,
          this.state.page
        );
        this.setState(state => ({
          hits: [...state.hits, ...data.hits],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  onLoadMore = e => {
    this.setState(state => ({ page: state.page + 1 }));
  };
  render() {
    const { hits, loading, totalHits, page, error } = this.state;
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
          <Button onLoadMore={this.onLoadMore}></Button>
        )}
      </>
    );
  }
}
ImageGallery.propTypes = {
  searchQ: PropTypes.string.isRequired,
};
