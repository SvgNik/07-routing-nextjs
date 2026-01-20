"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "../Modal/Modal";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

const NotePreview = ({ id }: NotePreviewProps) => {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.container}>
        {isLoading ? (
          <p>Завантаження...</p>
        ) : note ? (
          <>
            <div className={css.header}>
              <span className={css.tag}>{note.tag}</span>
              <h2 className={css.title}>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {note.createdAt
                ? new Date(note.createdAt).toLocaleDateString()
                : "Дата відсутня"}
            </p>
          </>
        ) : (
          <p>Нотатку не знайдено</p>
        )}
      </div>
    </Modal>
  );
};

export default NotePreview;
