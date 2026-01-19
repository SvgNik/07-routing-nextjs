import React from "react";
import css from "./LayoutNotes.module.css";

export default function FilterLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
      {modal}
    </div>
  );
}
