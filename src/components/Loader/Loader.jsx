import { Vortex } from 'react-loader-spinner';
import { StyledLoader } from './Loader.styled';

const Loader = () => (
  <StyledLoader>
    <Vortex width={50} height={50} />
  </StyledLoader>
);
export default Loader;
