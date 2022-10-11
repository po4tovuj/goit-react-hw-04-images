import PropTypes from 'prop-types';

import { LoadMoreButton } from 'components/Button/Button';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import Loader from 'components/Loader/Loader';
export const Gallery = ({ images, loadMore, isLastPage, isLoading }) => {
  return (
    <>
      <List id="gallery-list">
        {images.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <GalleryItem
              key={id}
              url={webformatURL}
              largeImageURL={largeImageURL}
            />
          );
        })}
        {isLoading && <Loader />}
        {!isLastPage && !isLoading && <LoadMoreButton handleClick={loadMore} />}
      </List>
    </>
  );
};
Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  loadMore: PropTypes.func,
  isLastPage: PropTypes.bool,
  isLoading: PropTypes.bool,
};
