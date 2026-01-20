"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "@/app/notes/Notes.module.css";

const NotesFilterClient = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const slugParam = params?.slug;
  const tag = Array.isArray(slugParam) ? slugParam[0] : "all";

  const PER_PAGE = 6;

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
    </div>
  );
};

export default NotesFilterClient;
