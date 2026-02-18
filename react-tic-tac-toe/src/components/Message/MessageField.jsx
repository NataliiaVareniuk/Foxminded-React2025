import css from "./Message.module.scss";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/gameSlice";

function MessageField({ num, isActive }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.game.messages);

  const [textInput, setTextInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    });
  }, [messages]);

  const handleInput = (e) => {
    setTextInput(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };
  function handleMessage() {
    const newMess = textInput.trim();
    if (!newMess) return;
    dispatch(addMessage({ player: num, text: newMess }));
    setTextInput("");
    
  }

  return (
    <div className={css.container}>
      <div className={num === "O" ? css.headerO : css.headerX}>
        Player {num === "O" ? 1 : 2}
      </div>

      <div className={css.messageField}>
        <div className={css.messages} ref={messagesEndRef}>
          <ul className={css.messageItems}>
            {messages.map((el, index) => (
              <Message key={index} mess={el} player={num} />
            ))}
          </ul>
        </div>

        <div className={css.messageSend}>
          <input
            ref={inputRef}
            value={textInput}
            className={css.inputMessage}
            placeholder="Message"
            onChange={(e) => handleInput(e)}
            type="text"
            onKeyDown={handleKeyDown}
          />
          <button className={css.sendButton} onClick={handleMessage}></button>
        </div>
      </div>
    </div>
  );
}

export default MessageField;
