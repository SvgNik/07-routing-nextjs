import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const Sidebar = () => {
  return (
    <aside className={css.sidebar}>
      <nav className={css.nav}>
        <ul className={css.list}>
          <li className={css.item}>
            <Link href="/notes/filter/all" className={css.link}>
              All Notes
            </Link>
          </li>

          {TAGS.map((tag) => (
            <li key={tag} className={css.item}>
              <Link href={`/notes/filter/${tag}`} className={css.link}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
