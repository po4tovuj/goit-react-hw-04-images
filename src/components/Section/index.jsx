import { SectionWrapper, SectionTitle } from './Section.styled';
import PropTypes from 'prop-types';

export const Section = ({ title = '', children }) => {
  return (
    <SectionWrapper>
      <SectionTitle>{title ?? null}</SectionTitle>
      {children}
    </SectionWrapper>
  );
};
Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
