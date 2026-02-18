import { useValidation } from "./useValidation";
import { useState, useEffect } from "react";

export function useInput(initialValue, name, onChange, comparing, isClear) {
  const [value, setValue] = useState(initialValue);
  const [isVisited, setIsVisited] = useState(false);

  const { isError, isValidField } = useValidation(
    value,
    name,
    comparing,
    isVisited
  );

  const handleChange = (event) => {
    const newValue = event.target.value.trim();
    setValue(newValue);
  };

  useEffect(() => {
    if (onChange) {
      onChange({
        value,
        isValid: isValidField,
      });
    }
  }, [value, isValidField, onChange]);

  useEffect(() => {
    if (isClear) {
      setValue("");
      setIsVisited(false);
    }
  }, [isClear]);

  const handleBlur = () => {
    setIsVisited(true);
  };

  return {
    value,
    handleChange,
    handleBlur,
    isVisited,
    isError,
  };
}
