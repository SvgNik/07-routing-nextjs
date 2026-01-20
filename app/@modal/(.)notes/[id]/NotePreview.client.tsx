"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

export default function NotePreviewClient() {
  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <NoteDetailsClient />
    </Modal>
  );
}
