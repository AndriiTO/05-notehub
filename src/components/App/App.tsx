import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes, type FetchNotesResponse } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

const PER_PAGE = 12;

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1); 
    setSearch(value);
  }, 500);

  const { data, isLoading } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
    staleTime: 5000,
    placeholderData: { notes: [], totalPages: 1 }, 
  });

  return (
    <div className={css.app}>
      {}
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />

        {data?.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      
      {isLoading && <p>Loading notes...</p>}

  
      {data?.notes.length > 0 && <NoteList notes={data.notes} />}

    
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
}