import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import css from "./Main.module.scss";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { useState, useCallback, useEffect } from "react";

function Main() {
  const [username, setUsername] = useState({ value: "", isValid: false });
  const [isClear, setIsClear] = useState(false);
  const [email, setEmail] = useState({ value: "", isValid: false });
  const [password, setPassword] = useState({ value: "", isValid: false });
  const [confirm, setConfirm] = useState({ value: "", isValid: false });

  const [isAgree, setIsAgree] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);


  useEffect(() => {
    if (
      username.isValid &&
      email.isValid &&
      password.isValid &&
      confirm.isValid &&
      isAgree
    ) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [username, email, password, confirm, isAgree]);

  const onChangeCheckbox = useCallback((value) => {
    setIsAgree(value);
  }, []);

  const validData = {
    isAgree,
    isValidForm,
  };

    const formSubmit = async (e) => {
    e.preventDefault();
    alert("Form successfully submitted!");
    onChangeCheckbox(false);
    setIsClear(true);
  };

  useEffect(() => {
    if (isClear) {
      setIsClear(false);
    }
  }, [isClear]);
  const handleUsername = useCallback((data) => setUsername(data), []);
  const handleEmail = useCallback((data) => {setEmail(data);}, [])
  const handlePassword = useCallback((data) => {setPassword(data);}, [])
  const handleConfirm = useCallback((data) => {setConfirm(data);}, [])

  return (
    <>
      <form id="login-form" className={css.form} onSubmit={formSubmit}>
        <Input
          isClear={isClear}
          label_text="Username"
          placeholder="Enter your username"
          name="username"
          type="text"
          onChange={handleUsername}
        />
        <Input
          isClear={isClear}
          label_text="Email"
          placeholder="Enter your email"
          name="email"
          type="email"
          onChange={handleEmail}
        />
        <Input
          isClear={isClear}
          label_text="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          onChange={handlePassword}
        />
        <Input
          isClear={isClear}
          label_text="Confirm password"
          placeholder="Enter your password"
          name="confirm"
          type="password"
          onChange={handleConfirm}
          comparing={password.value}
        />
        <Checkbox isAgreeMain={isAgree} onChange={onChangeCheckbox} />
        <Button data={validData} />
        <p className={css.info}>*Required field</p>
      </form>
    </>
  );
}

export default Main;
