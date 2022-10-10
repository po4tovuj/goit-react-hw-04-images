import PropTypes from 'prop-types';

import { LoadMoreButton } from 'components/Button/Button';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const Gallery = ({ images, loadMore, isLastPage, isLoading }) => {
  return (
    <div>
      <List>
        {images.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <GalleryItem
              key={id}
              url={webformatURL}
              largeImageURL={largeImageURL}
            />
          );
        })}
      </List>
      {!isLastPage && (
        <LoadMoreButton isLoading={isLoading} handleClick={loadMore} />
      )}
    </div>
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
};
