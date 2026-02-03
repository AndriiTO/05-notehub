


import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { fetchNotes } from "../../services/noteService";
import css from "./App.module.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useQuery({
  queryKey: ["notes", searchQuery, currentPage],
  queryFn: () =>
    fetchNotes({
      page: currentPage,
      perPage: 12,
      search: searchQuery,
    }),
  placeholderData: keepPreviousData,
});

  // const { data } = useQuery({
  //   queryKey: ["notes", searchQuery, currentPage],
  //   queryFn: () => fetchNotes(searchQuery, currentPage),
  //   placeholderData: keepPreviousData,
  // });

  const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  }, 300);

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={changeSearchQuery} />

        {totalPages > 1 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
  
                                  //  варіант ментора (відображаєтся помилка)

// import { useState } from "react";
// import { useQuery, keepPreviousData } from "@tanstack/react-query";
// import { useDebouncedCallback } from "use-debounce";
// import Modal from "../Modal/Modal";
// import NoteForm from "../NoteForm/NoteForm";
// import NoteList from "../NoteList/NoteList";
// import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";
// import { fetchNotes } from "../../services/noteService";
// import css from "./App.module.css";

// export default function App() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const { data } = useQuery({
//     queryKey: ["notes", searchQuery, currentPage],
//     queryFn: () => fetchNotes(searchQuery, currentPage),
//     placeholderData: keepPreviousData,
//   });

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
//     setCurrentPage(1);
//     setSearchQuery(newQuery);
//   }, 300);

//   const totalPages = data?.totalPages ?? 0;
//   const notes = data?.notes ?? [];

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox onSearch={changeSearchQuery} />
//         {totalPages > 1 && (
//           <Pagination
//             totalPages={totalPages}
//             currentPage={currentPage}
//             onPageChange={setCurrentPage}
//           />
//         )}
//         <button className={css.button} onClick={toggleModal}>
//           Create note +
//         </button>
//       </header>

//       {isModalOpen && (
//         <Modal onClose={toggleModal}>
//           <NoteForm onClose={toggleModal} />
//         </Modal>
//       )}

//       {notes.length > 0 && <NoteList notes={notes} />}
//     </div>
//   );
// }



                                    // мій варіант

// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useDebouncedCallback } from 'use-debounce';
// import { fetchNotes, type FetchNotesResponse } from '../../services/noteService';
// import NoteList from '../NoteList/NoteList';
// import Pagination from '../Pagination/Pagination';
// import SearchBox from '../SearchBox/SearchBox';
// import Modal from '../Modal/Modal';
// import NoteForm from '../NoteForm/NoteForm';
// import css from './App.module.css';

// const PER_PAGE = 12;

// export default function App() {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [prevData, setPrevData] = useState<FetchNotesResponse | null>(null);

//   const debouncedSearch = useDebouncedCallback((value: string) => {
//     setPage(1);
//     setSearch(value);
//   }, 500);

//     const query = useQuery<FetchNotesResponse, Error>({
//     queryKey: ['notes', page, search],
//     queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
//     staleTime: 5000,
//      placeholderData: (prev) => prev,
//   });

//   const data = query.data ?? prevData ?? { notes: [], totalPages: 1 };

//   if (query.data && query.data !== prevData) {
//     setPrevData(query.data);
//   }

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox onSearch={debouncedSearch} />
//         {data.totalPages > 1 && (
//           <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
//         )}
//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>
//       </header>

//       {query.isLoading && <p>Loading notes...</p>}
//       {data.notes.length > 0 ? <NoteList notes={data.notes} /> : <p>No notes found.</p>}

//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onClose={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }