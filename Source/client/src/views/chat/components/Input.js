import React from 'react';

const Input = ({
  label = '',
  name = '',
  type = 'text',
  className = '',
  inputClassName = '',
  isRequired = true,
  placeholder = '',
  value = '',
  onChange = () => {},
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} className={`w-100 ${inputClassName}`} placeholder={placeholder} required={isRequired} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
