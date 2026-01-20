"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "@/app/notes/Notes.module.css";

interface NotesFilterClientProps {
  tag: string;
}

const NotesFilterClient = ({ tag }: NotesFilterClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const PER_PAGE = 6;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch, tag }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <h1 className={css.title}>
          {tag === "all" ? "All Notes" : `${tag} Notes`}
        </h1>

        <button className={css.createBtn} onClick={openModal}>
          Create note +
        </button>

        <SearchBox value={search} onChange={handleSearch} />
      </div>

      {isLoading && <p className={css.empty}>Loading notes...</p>}

      {isError && (
        <p className={css.error}>
          Error:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}

      {notes.length > 0 ? (
        <>
          <NoteList notes={notes} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              handlePageClick={handlePageClick}
              currentPage={page}
            />
          )}
        </>
      ) : (
        !isLoading && !isError && <p className={css.empty}>No notes found</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NoteForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default NotesFilterClient;
