import css from "./Gamer.module.scss";
import Square from "../square/Square";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeMove } from "../../store/gameSlice";

function Gamer({ isActive }) {
  const dispatch = useDispatch();
  const { squares, winner, rotateDeg, left, top } = useSelector((state) => state.game);

  const handleSquareClick = (index) => {
    if (!isActive || winner) return;
    dispatch(makeMove(index));
  };

  const gamerClass = classNames(css.boardGame, {
    [css["gamerIsActive"]]: isActive,
  });

  const winnerLine =(
   
          <div
            className={css.winLine}
            style={{
              transform: `rotate(${rotateDeg}deg)`,
              left: `calc(${left} * var(--square-size) )`, 
              top: `${top}%`, 
            }}
          ></div>
        )

  return (
    <>
      <div className={css.boardGameContainer}>
        <div className={gamerClass}>
          {squares.map((sq, index) => (
            <Square
              key={index}
              value={sq}
              onClick={() => handleSquareClick(index)}
            />
          ))}
        </div>
        {(winner==="X"|| winner ==="O") && winnerLine}
      </div>
    </>
  );
}

export default Gamer;
