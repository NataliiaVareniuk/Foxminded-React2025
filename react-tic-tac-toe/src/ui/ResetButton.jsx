import css from "./ResetButton.module.scss";

function ResetButton({ onClick }) {
  return (
    <>
      <button className={css.resetButton} onClick={onClick}>
        Reset
      </button>
    </>
  );
}

export default ResetButton;
