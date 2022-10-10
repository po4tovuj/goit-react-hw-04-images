import { Modal } from 'components/Modal';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useState } from 'react';

import { Image, ListItem } from './ImageGalleryItem.styled';

export const GalleryItem = ({ largeImageURL, url }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  return (
    <ListItem onClick={() => setIsModalShow(true)}>
      <Image src={url} alt="img" />
      {isModalShow && (
        <Modal
          onClose={() => {
            console.log('should change status');
            setIsModalShow(false);
          }}
          url={largeImageURL}
        />
      )}
    </ListItem>
  );
};
GalleryItem.propTypes = {
  url: PropTypes.string,
  largeImageURL: PropTypes.string,
};
