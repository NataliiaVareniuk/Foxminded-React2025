import css from "./BoardGame.module.scss";
import { useEffect } from "react";
import Gamer from "../Gamer/Gamer";
import MessageField from "../../components/Message/MessageField";
import { useSelector, useDispatch } from "react-redux";
import { newGame } from "../../store/gameSlice";

function BoardGame() {
  const dispatch = useDispatch();
  const { isX, winner, messages, isNewGame } = useSelector(
    (state) => state.game
  );

  const getStatus = (player) => {
    if (isNewGame) {
      return player === "X"
        ? "Game started! Your turn:"
        : "Game started! Wait your opponent.";
    }
    if (winner) return `Winner: ${winner}`;
    if (player === "X") return isX ? "Your turn:" : "Wait your opponent.";
    if (player === "O") return !isX ? "Your turn:" : "Wait your opponent.";
  };

  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        dispatch(newGame());
      }, 5000);
   
      return () => clearTimeout(timer);
    }
  }, [winner, dispatch]);

  const renderStatus  = (player) =>{
    if (winner){
      if(winner === player) return  <div className={css.winner}> You win! </div>
       if(winner !== player && winner !== "draw" ) return <div className={css.looser}>You lost!</div>;  
      return  <div className={css.draw}>Draw!</div>;
       
    }
    return <div className={css.titlePlayer}>{getStatus(player, messages)}</div>
  }

  return (
    <>
      <div className={css.players}>
        <div className={css.player}>
          {renderStatus("O") }

          <Gamer isActive={!isX} player="O" />
          <MessageField num="O" isActive={!isX} textMessages={messages} />
        </div>
        <div className={css.player}>
           {renderStatus("X") }

          <Gamer isActive={isX} player="X" />

          <MessageField num="X" isActive={isX} textMessages={messages} />
        </div>
      </div>
    </>
  );
}

export default BoardGame;
