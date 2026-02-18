import { useState, useEffect } from "react";

export function useValidation(value, name, comparing, isVisited) {
  const [isError, setError] = useState("");
  const [isValidField, setIsValidField] = useState(false);
 

  useEffect(() => {
   let error = "";
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const specialSymbol = /[#.?!@$%^&*-]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const alphabetsNumber = /^[a-zA-Z0-9]+$/;
     if (!isVisited) {
      setError("");
      return;
    }

  switch (name) {
    case "password":
      if ( value.length < 8) {
        error = "Must contain at least 8 symbols";
      } else if (!numbers.test(value)) {
        error = "Must contain at least 1 number";
      } else if (!specialSymbol.test(value)) {
        error = "Must contain at least 1 special symbol";
      } else if (!upperCaseLetters.test(value)) {
        error = "Must contain at least 1 upper case symbol";
      }

      break;
    case "username":
      if (value.length < 3){
         error = "Must contain at least 3 symbols";
      }else if (!alphabetsNumber.test(value)) {
        error = "Alphabets and number only";
      }
       
      break;

    case "email":
      if (
          value.length < 3 ||
        !emailPattern.test(String(value).toLowerCase())
      ) {
        error = "Please enter a valid email address";
      }
      break;

    case "confirm":
      if ( value.length < 8) {
        error = "Must contain at least 8 symbols";
      } else if (value !== comparing) {
        error = "Passwords are not the same";
      }
      break;
    default:
      break;
    }
    setError(error);
    setIsValidField(error === "");
   
  }, [value, name, comparing, isVisited]);
  return { isError, isValidField };
}
