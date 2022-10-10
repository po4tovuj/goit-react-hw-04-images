import { Notify } from 'notiflix';
import { getImages } from 'API/ImagesApi';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { Header } from 'components/SearchBar/SearchBar';
import { Component } from 'react';

import { Container } from './App.styled';
const INITIAL_STATE = {
  images: [],
  searchQuery: '',
  page: 1,
  totalPages: 1,
  isLoading: false,
};
const options = {
  position: 'left-top',
  fontSize: '20px',
  width: 'fit-content',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleSearch = async query => {
    // there are no clear requirments about to should happen if we click submit button with same query, so lets do not search if the query is the same as it was.
    if (query === this.state.searchQuery) {
      return;
    }
    this.setState({ searchQuery: query });

    const images = await getImages({ query, page: 1 })
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          throw new Error(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }
        const totalPages = Math.ceil(totalHits / 20);

        Notify.success(`Hooray! We found ${totalHits} images.`, options);
        return { images: hits, totalPages, page: 1 };
      })
      .catch(err => {
        const message = err.message;
        Notify.failure(message, options);
        return { images: [], totalPages: 0, page: 1 };
      });
    this.setState({ ...images });
  };
  loadMore = async () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
    const { page, searchQuery } = this.state;

    const response = await getImages({ query: searchQuery, page: page + 1 })
      .then(({ hits }) => {
        if (!hits.length) {
          throw new Error(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }

        return { images: hits, page: page + 1 };
      })
      .catch(err => {
        const message = err.message;
        Notify.failure(message, options);
        return { images: [], totalPages: 1, page: 1 };
      });

    this.setState(({ images, page, isLoading, totalPages }) => {
      return {
        images: images.concat(response.images),
        page: response.page,
        totalPages: response.totalPages || totalPages,
        isLoading: !isLoading,
      };
    });
  };

  render() {
    const { page, totalPages } = this.state;
    const isLastPage = page === totalPages;
    return (
      <Container>
        <Header handleSearch={this.handleSearch}></Header>
        <Gallery
          images={this.state.images}
          loadMore={this.loadMore}
          isLastPage={isLastPage}
          isLoading={this.state.isLoading}
        ></Gallery>
      </Container>
    );
  }
}
