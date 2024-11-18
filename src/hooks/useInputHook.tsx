import {ChangeEvent, FocusEvent, useState} from "react";

function useInputHook() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRemainingText, setRemainingText] = useState<String>("");

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsInputFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsInputFocused(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRemainingText(event.target.value);
  };

  return {
    isInputFocused,
    isRemainingText,
    handleFocus,
    handleBlur,
    handleChange,
  };
}

export default useInputHook;
