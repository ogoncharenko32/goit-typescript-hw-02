import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

export type Image = {
  alt_description: string | null;
  urls: {
    regular: string;
    small: string;
  };
  user: {
    name: string;
  };
  likes: number;
};

type ApiResponse = {
  total: number;
  total_pages: number;
  results: Image[];
};

function App() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [errorHtml, setErrorHtml] = useState<string>('');

  const closeModal = () => {
    setIsOpen(false);
    setModalImage(null);
  };

  const onSubmit = (newQuery: string) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    }
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onElementClick = (image: Image) => {
    setIsOpen(true);
    setModalImage(image);
  };

  const fetchImages = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setErrorHtml('');

    try {
      const accessKey = 'NabULvd345v9_XItWTWuBI28g1UanV6BDGwO8AhN7n8';
      const response = await axios.get<ApiResponse>(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            client_id: accessKey,
            page,
            query,
            per_page: 12,
            orientation: 'landscape',
          },
        }
      );

      const imagesData = response.data.results;
      if (response.data.total === 0) {
        toast(`Sorry, no photos found with ${query}`);
        setLoadMoreBtn(false);
        setImages([]);
      } else {
        setImages(prevImages =>
          page === 1 ? imagesData : [...prevImages, ...imagesData]
        );
        setLoadMoreBtn(page < response.data.total_pages);
      }
    } catch (error) {
      setImages([]);
      setErrorHtml((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [images]);

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onElementClick={onElementClick} />
      )}
      {errorHtml && <ErrorMessage errorHtml={errorHtml} />}
      {loading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            justifyContent: 'center',
          }}
        />
      )}
      {loadMoreBtn && (
        <div>
          <LoadMoreBtn onLoadMore={onLoadMore} />
        </div>
      )}
      {modalIsOpen && modalImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
    </div>
  );
}

export default App;
