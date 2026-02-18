import NavBar from "../Navbar/NavBar";
import style from "./Header.module.scss";

function Header() {
  return (
    <header className={style.header}>
      <NavBar />
    </header>
  );
}

export default Header;
