import React from 'react';
import '../styles/FormInput.css';

const FormInput = ({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  isValid, 
  placeholder, 
  hint,
  passwordStrength 
}) => {
  const getInputClass = () => {
    if (!error && !isValid) return 'form-input-default';
    if (error) return 'form-input-error';
    if (isValid) return 'form-input-valid';
    return 'form-input-default';
  };

  const getPasswordStrengthClass = () => {
    if (passwordStrength === 'Weak') return 'password-strength-weak';
    if (passwordStrength === 'Medium') return 'password-strength-medium';
    if (passwordStrength === 'Strong') return 'password-strength-strong';
    return '';
  };

  return (
    <div className="form-input-container">
      <label className="form-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-input ${getInputClass()}`}
          placeholder={placeholder}
        />
        {isValid && (
          <svg className="input-icon input-icon-valid" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {error && (
          <svg className="input-icon input-icon-error" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      
      {error && (
        <p className="error-message">
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
      
      {!error && passwordStrength && (
        <p className={`password-strength ${getPasswordStrengthClass()}`}>
          Password Strength: {passwordStrength}
        </p>
      )}
      
      {hint && !error && !passwordStrength && (
        <p className="input-hint">{hint}</p>
      )}
    </div>
  );
};

export default FormInput;