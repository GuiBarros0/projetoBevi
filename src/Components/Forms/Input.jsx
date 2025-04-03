import React from 'react';

const Input = ({ label, type, name, value, onChange, error, onBlur, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block pb-2" htmlFor={name}>
        {label}
      </label>
      <input id={name} className="border-2 rounded-lg bg-gray-200  border-gray-200 block w-full p-3 transition-all outline-none hover:border-blue-300 hover:bg-gray-100 hover:shadow-lg" type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} />
      {error && <p className="text-red-700 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
