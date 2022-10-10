import PropTypes from 'prop-types';

import { LoadMoreButton } from 'components/Button/Button';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import Loader from 'components/Loader/Loader';
import { css } from '@emotion/react';
export const Gallery = ({ images, loadMore, isLastPage, isLoading }) => {
  return (
    <>
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
      {isLoading && <Loader />}
      {!isLastPage && !isLoading && <LoadMoreButton handleClick={loadMore} />}
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
