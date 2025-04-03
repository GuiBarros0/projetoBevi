import React from 'react';

const validation = {
  email: {
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: 'Preencha um email válido!',
  },
  number: {
    regex: /^\d*\.?\d+$/,
    message: 'Ultilize apenas números!',
  },
  numeric: {
    regex: /^[1-3]$/,
    message: 'Ultilize apenas 1, 2 ou 3',
  },
};

const useForm = (typeValid) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  function validate(value) {
    if (typeValid === false) return true;

    if (validation[typeValid] && !validation[typeValid].regex.test(value)) {
      setError(validation[typeValid].message);
      return false;
    }

    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    }

    setError(null);
    return true;
  }

  function onChange({ target }) {
    setValue(target.value);
    if (error) validate(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
