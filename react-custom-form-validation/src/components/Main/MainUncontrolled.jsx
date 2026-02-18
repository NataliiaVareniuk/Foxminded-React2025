import Button from "../../ui/Button/Button";
import InputUncontrolled from "../../ui/Input/InputUncontrolled";
import css from "./Main.module.scss";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { useRef, useState, useEffect, useCallback } from "react";


function MainUncontrolled() {
  const [isAgree, setIsAgree] = useState(false);
 const [isValidForm, setIsValidForm] = useState(false);
  const [username, setUsername] = useState({  isValid: false });
  const [email, setEmail] = useState({isValid: false });
  const [password, setPassword] = useState({ isValid: false });
  const [confirm, setConfirm] = useState({ isValid: false });

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const fieldConfigs = [
    { name: "username", ref: usernameRef, comparing: "" },
    { name: "email", ref: emailRef, comparing: "" },
    { name: "password", ref: passwordRef, comparing: "" },
    {
      name: "confirm",
      ref: confirmRef,
      comparing: passwordRef.current?.value || "",
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

   alert("Form successfully submitted!");

    fieldConfigs.forEach(({ ref }) => {
      if (ref.current) {
        ref.current.value = "";
      }
    });
   
   setUsername({isValid: false});
   setEmail({isValid: false});
   setPassword({isValid: false});
   setConfirm({isValid: false});
   
   onChangeCheckbox(false);

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
    isValidForm
  };

  return (
    <>
      <form id="form" className={css.form} onSubmit={formSubmit}>
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
        <Button data={validData} />
        <p className={css.info}>*Required field</p>
      </form>
    </>
  );
}

export default MainUncontrolled;
