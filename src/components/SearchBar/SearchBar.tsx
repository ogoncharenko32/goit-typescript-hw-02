import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';
import { FormEvent } from 'react';

type SearchBarParams = {
  onSubmit: (query: string) => void;
};

const SearchBar = ({ onSubmit }: SearchBarParams) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const inputElement = form.elements.namedItem('input') as HTMLInputElement;
    const query = inputElement.value;

    if (query === '') {
      toast.error('Hey, you forgot to print something');
      return;
    }

    onSubmit(query);
    event.currentTarget.reset();
  };

  return (
    <header>
      <div>
        <Toaster />
      </div>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputWrapper}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            name="input"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.searchBtn} type="submit">
            🔎
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
