'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './SearchGifs.module.css';

interface SearchGifsProps {
  setSearchTerm: (term: string) => void;
}

export default function SearchGifs({ setSearchTerm }: SearchGifsProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Find your GIF"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <span className={styles.searchText}>Search</span>
        </button>
      </form>
    </div>
  );
}
