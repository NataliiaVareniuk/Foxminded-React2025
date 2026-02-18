import css from "./Message.module.scss";
import { useState, useEffect } from "react";
import classNames from "classnames";

function Message({ mess, player }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const statTime = new Date();

    setTime(
      statTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }, [mess]);

  const messageItemClass = classNames({
    [css.messageItem]: true,
    [css["messageItemMy"]]:
      (mess.player === "X" && player === "X") ||
      (mess.player === "O" && player === "O"),
  });
  return (
    <>
      {mess.text && (
        <li className={messageItemClass}>
          {mess.text}

          <span className={css.time}>{time}</span>
        </li>
      )}
    </>
  );
}
export default Message;
