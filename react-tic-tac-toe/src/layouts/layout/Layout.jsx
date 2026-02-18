import Header from "../Header/Header";
import BoardGame from "../../components/boardGame/BoardGame";
import css from "./Layout.module.scss";

function Layout() {
  return (
    <div className={css.wrapper}>
      <Header />
      <hr />
      <BoardGame />
    </div>
  );
}

export default Layout;
