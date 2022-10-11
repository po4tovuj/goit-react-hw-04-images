import { Notify } from 'notiflix';
import { getImages } from 'API/ImagesApi';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { Header } from 'components/SearchBar/SearchBar';
// import { Component } from 'react';

import { Container } from './App.styled';
import { useState, useEffect } from 'react';
// import {  } from 'react';
// const INITIAL_STATE = {
//   images: [],
//   searchQuery: '',
//   page: 1,
//   totalPages: 1,
//   isLoading: false,
// };
const options = {
  position: 'left-top',
  fontSize: '20px',
  width: 'fit-content',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(true);
  useEffect(() => {
    setIsLastPage(page === totalPage);
    if (page > 1) {
      const { height: cardHeight } = document
        .querySelector('#gallery-list')
        .firstElementChild.getBoundingClientRect();

      console.log('cardHeight: ', cardHeight);
      window.scrollBy({
        top: cardHeight,
        behavior: 'smooth',
      });
    }
  }, [page, totalPage]);
  const handleFilterQueryChange = query => {
    setSearchQuery(query);
    doSearch(query);
  };

  const doSearch = query => {
    getImages({ query, page: 1 })
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          throw new Error(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }
        setTotalPage(Math.ceil(totalHits / 20));
        setImages(hits);
        setPage(1);
        Notify.success(`Hooray! We found ${totalHits} images.`, options);
      })
      .catch(err => {
        const message = err.message;
        Notify.failure(message, options);
        setImages([]);
        setTotalPage(1);
        setPage(1);
      });
  };
  const loadMore = () => {
    setIsLoading(true);

    getImages({ query: searchQuery, page: page + 1 })
      .then(({ hits }) => {
        if (!hits.length) {
          throw new Error(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }
        setImages(state => state.concat(hits));
        setPage(state => state + 1);
        setIsLoading(false);
      })
      .catch(err => {
        const message = err.message;
        Notify.failure(message, options);
        setIsLoading(false);
      });
  };
  return (
    <Container>
      <Header onFilterChange={query => handleFilterQueryChange(query)}></Header>
      <Gallery
        images={images}
        loadMore={loadMore}
        isLastPage={isLastPage}
        isLoading={isLoading}
      ></Gallery>
    </Container>
  );
};
// export class OldApp extends Component {
//   state = {
//     ...INITIAL_STATE,
//   };
//   /** I dont understand why to do it in this way but its the only place and case i see were to use life cycle hooks for this task */
//   componentDidUpdate(prevProps, prevState) {
//     const { searchQuery, page, images } = this.state;
//     if (searchQuery !== prevState.searchQuery) {
//       this.doSearch(searchQuery);
//     }
//     if (page > 1 && images !== prevState.images) {
//       const { height: cardHeight } = document
//         .querySelector('#gallery-list')
//         .firstElementChild.getBoundingClientRect();

//       console.log('cardHeight: ', cardHeight);
//       window.scrollBy({
//         top: cardHeight * 2,
//         behavior: 'smooth',
//       });
//     }
//   }
//   doSearch = async query => {
//     const images = await getImages({ query, page: 1 })
//       .then(({ hits, totalHits }) => {
//         if (!hits.length) {
//           throw new Error(
//             `Sorry, there are no images matching your search query. Please try again.`
//           );
//         }
//         const totalPages = Math.ceil(totalHits / 20);

//         Notify.success(`Hooray! We found ${totalHits} images.`, options);
//         return { images: hits, totalPages, page: 1 };
//       })
//       .catch(err => {
//         const message = err.message;
//         Notify.failure(message, options);
//         return { images: [], totalPages: 0, page: 1 };
//       });
//     this.setState({ ...images });
//   };
//   handleFilterQueryChange = query => {
//     this.setState({ searchQuery: query.trim().toLowerCase() });
//   };
//   loadMore = () => {
//     this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
//     const { page, searchQuery } = this.state;

//     getImages({ query: searchQuery, page: page + 1 })
//       .then(({ hits }) => {
//         if (!hits.length) {
//           throw new Error(
//             `Sorry, there are no images matching your search query. Please try again.`
//           );
//         }
//         this.setState(({ images, page, isLoading }) => ({
//           images: images.concat(hits),
//           page: page + 1,
//           isLoading: !isLoading,
//         }));
//       })
//       .catch(err => {
//         const message = err.message;
//         Notify.failure(message, options);
//         this.setState({ images: [], isLoading: false });
//       });
//   };

//   render() {
//     const { page, totalPages } = this.state;
//     const isLastPage = page === totalPages;
//     return (
//       <Container>
//         <Header onFilterChange={this.handleFilterQueryChange}></Header>
//         <Gallery
//           images={this.state.images}
//           loadMore={this.loadMore}
//           isLastPage={isLastPage}
//           isLoading={this.state.isLoading}
//         ></Gallery>
//       </Container>
//     );
//   }
// }
