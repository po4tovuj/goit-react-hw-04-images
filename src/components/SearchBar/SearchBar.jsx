import PropTypes from 'prop-types';
import { Formik } from 'formik';

import {
  Input,
  SearchBar,
  SearchBtn,
  SearchBtnLabel,
  SearchForm,
} from './SearchBar.styled';
export const Header = ({ onFilterChange }) => {
  return (
    <SearchBar>
      <Formik
        initialValues={{ searchQuery: '' }}
        onSubmit={values => {
          onFilterChange(values.searchQuery);
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <SearchForm onSubmit={handleSubmit}>
            <SearchBtn type="submit">
              <SearchBtnLabel>Search</SearchBtnLabel>
            </SearchBtn>
            <Input
              type="text"
              autocomplete="off"
              autoFocus
              onChange={handleChange}
              name="searchQuery"
              value={values.searchQuery}
              placeholder="Search images and photos"
            />
          </SearchForm>
        )}
      </Formik>
    </SearchBar>
  );
};
Header.propTypes = {
  onFilterChange: PropTypes.func,
};
