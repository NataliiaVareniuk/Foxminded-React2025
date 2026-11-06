import Button from "../../ui/Button/Button";
import InputUncontrolled from "../../ui/Input/InputUncontrolled";
import css from "./Main.module.scss";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { useRef, useState, useEffect, useCallback } from "react";
import { fieldValidation } from "../../utils/fieldValidation";
import Toast from "../../ui/Toast/Toast";

function MainUncontrolled() {
  const [isAgree, setIsAgree] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [username, setUsername] = useState({ isValid: false });
  const [email, setEmail] = useState({ isValid: false });
  const [password, setPassword] = useState({ isValid: false });
  const [confirm, setConfirm] = useState({ isValid: false });
  const [showToast, setShowToast] = useState(false);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const fieldConfigs = [
    { name: "username", ref: usernameRef },
    { name: "email", ref: emailRef },
    { name: "password", ref: passwordRef },
    {
      name: "confirm",
      ref: confirmRef,
    },
  ];

  const onChangeCheckbox = useCallback((value) => {
    setIsAgree(value);
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();

    const formData = {};
    fieldConfigs.forEach(({ name, ref }) => {
      formData[name] = ref.current ? ref.current.value : "";
    });

    const isFormValid = fieldConfigs.every(({ name }) => {
      const { isValid } = fieldValidation(
        formData[name],
        name,
        formData.password,
      );
      return isValid;
    });
    if (!isFormValid || !isAgree) {
      alert("Please fill in all required fields correctly.");
      return;
    } else {
      setShowToast(true);
        
      fieldConfigs.forEach(({ ref }) => {
        if (ref.current) {
          ref.current.value = "";
        }
      });
      setUsername({ isValid: false });
      setEmail({ isValid: false });
      setPassword({ isValid: false });
      setConfirm({ isValid: false });
      onChangeCheckbox(false);
    }
  };

  useEffect(() => {
    if (
      username.isValid &&
      email.isValid &&
      password.isValid &&
      confirm.isValid
    ) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [username, email, password, confirm]);

  const validData = {
    isAgree,
    isValidForm,
  };

  return (
    <>
      <form id="form" className={css.form} onSubmit={formSubmit} noValidate>
        <InputUncontrolled
          label_text="Username"
          placeholder="Enter your username"
          name="username"
          type="text"
          ref={usernameRef}
          onBlurValid={useCallback((data) => {
            setUsername(data);
          }, [])}
        />
        <InputUncontrolled
          label_text="Email"
          placeholder="Enter your email"
          name="email"
          type="email"
          ref={emailRef}
          onBlurValid={useCallback((data) => {
            setEmail(data);
          }, [])}
        />
        <InputUncontrolled
          label_text="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          ref={passwordRef}
          onBlurValid={useCallback((data) => {
            setPassword(data);
          }, [])}
        />
        <InputUncontrolled
          label_text="Confirm password"
          placeholder="Enter your password"
          name="confirm"
          type="password"
          ref={confirmRef}
          comparing={passwordRef}
          onBlurValid={useCallback((data) => {
            setConfirm(data);
          }, [])}
        />
        <Checkbox isAgreeMain={isAgree} onChange={onChangeCheckbox} />
        
        <div className={css.toastDemo}>
          <Button data={validData} />
        </div>
        
        <p className={css.info}>*Required field</p>
         <Toast
            message="Form successfully checked!"
            duration={3000}
            onClose={() => setShowToast(false)}
            isOpen={showToast}
          />
       
      </form>

       
        
    </>
  );
}

export default MainUncontrolled;
 