import PropTypes from 'prop-types';

import { useEffect, useCallback } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';

export const Modal = ({ onClose, url }) => {
  const escFunction = useCallback(
    event => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const modalRoot = document.querySelector('#modal-root');
  return createPortal(
    <Overlay onClick={onClose}>
      <ModalStyled>
        <img src={url} alt="broken " />
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
};
Modal.propTypes = {
  onClose: PropTypes.func,
  url: PropTypes.string,
};
