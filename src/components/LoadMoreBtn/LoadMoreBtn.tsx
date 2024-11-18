import css from './LoadMoreBtn.module.css';

type LoadMoreBtnParams = {
  onLoadMore: () => void;
};

const LoadMoreBtn = ({ onLoadMore }: LoadMoreBtnParams) => {
  return (
    <button className={css.btn} onClick={onLoadMore} type="button">
      Load More
    </button>
  );
};

export default LoadMoreBtn;
