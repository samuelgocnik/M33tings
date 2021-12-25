import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (
  state: { isTouched: boolean; value: string | null },
  action: { type: string; value: string | null }
) => {
  switch (action.type) {
    case 'INPUT': {
      return { value: action.value, isTouched: state.isTouched };
    }
    case 'BLUR': {
      return { isTouched: true, value: state.value };
    }
    default: {
      return initialInputState;
    }
  }
};

const useInput = (validateValue: (arg0: any) => any) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  const inputIsValid = validateValue(inputState.value) && inputState.isTouched;

  const inputChangeHandler = (event: { target: { value: any } }) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR', value: null });
  };

  const reset = () => {
    dispatch({ type: 'RESET', value: null });
  };

  return {
    value: inputState.value || '',
    isValid: inputIsValid,
    wasTouched: inputState.isTouched,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
