import PropTypes from 'prop-types';

import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import { useEffect } from 'react';
export const Gallery = ({ images }) => {
  useEffect(() => {
    if (images.length > 20) {
      const { height: cardHeight } = document
        .querySelector('#gallery-list')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    } else if (images.length) {
      window.scroll({ top: 0, behavior: 'smooth' });
    }
  }, [images]);
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
  currentPage: PropTypes.number,
};
