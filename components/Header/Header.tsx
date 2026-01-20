import Link from "next/link";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>
        <ul className={css.menu}>
          <li>
            <Link href="/" className={css.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/notes/filter/all" className={css.link}>
              Notes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;