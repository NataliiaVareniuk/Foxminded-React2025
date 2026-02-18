import css from "./Square.module.scss";
import classNames from "classnames";

function Square({ value, onClick }) {
  const squareClass = classNames(css.square, {
    [css["squareX"]]: value === "X",
    [css["squareO"]]: value === "O",
  });
  return (
    <>
      <button onClick={onClick} className={squareClass}></button>
    </>
  );
}

export default Square;
