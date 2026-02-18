import ResetButton from "../../ui/ResetButton";
import css from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../../store/gameSlice";

function Header() {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.game.score);

  return (
    <header>
      <h2>Player 1</h2>
      <div className={css.score}>
        <h1 className={css.title}>
          Score: {score.O}:{score.X}
        </h1>
        <ResetButton onClick={() => dispatch(resetGame())} />
      </div>

      <h2>Player 2</h2>
    </header>
  );
}

export default Header;
