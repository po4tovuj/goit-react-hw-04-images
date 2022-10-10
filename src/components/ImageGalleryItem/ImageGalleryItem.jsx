import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Image, ListItem } from './ImageGalleryItem.styled';

export const GalleryItem = ({ largeImageURL, url }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  return (
    <>
      <ListItem onClick={() => setIsModalShow(true)}>
        <Image src={url} alt="img" />
      </ListItem>
      {isModalShow && (
        <Modal onClose={() => setIsModalShow(false)} url={largeImageURL} />
      )}
    </>
  );
};
GalleryItem.propTypes = {
  url: PropTypes.string,
  largeImageURL: PropTypes.string,
};
