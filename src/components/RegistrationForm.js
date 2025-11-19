import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import SuccessMessage from './SuccessMessage';
import { validateName, validateEmail, validatePassword, validateConfirmPassword, calculatePasswordStrength } from '../utils/validations';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [validFields, setValidFields] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    const newErrors = { ...errors };
    const newValid = { ...validFields };

    if (touched.name) {
      const nameError = validateName(formData.name);
      newErrors.name = nameError;
      newValid.name = !nameError;
    }

    if (touched.email) {
      const emailError = validateEmail(formData.email);
      newErrors.email = emailError;
      newValid.email = !emailError;
    }

    if (touched.password) {
      const passwordError = validatePassword(formData.password);
      newErrors.password = passwordError;
      newValid.password = !passwordError;
      setPasswordStrength(calculatePasswordStrength(formData.password));
    }

    if (touched.confirmPassword) {
      const confirmError = validateConfirmPassword(formData.confirmPassword, formData.password);
      newErrors.confirmPassword = confirmError;
      newValid.confirmPassword = !confirmError;
    }

    setErrors(newErrors);
    setValidFields(newValid);
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const isFormValid = () => {
    return validFields.name && 
           validFields.email && 
           validFields.password && 
           validFields.confirmPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmError = validateConfirmPassword(formData.confirmPassword, formData.password);

    if (nameError || emailError || passwordError || confirmError) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setTouched({
          name: false,
          email: false,
          password: false,
          confirmPassword: false
        });
        setValidFields({
          name: false,
          email: false,
          password: false,
          confirmPassword: false
        });
        setShowSuccess(false);
        setPasswordStrength('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        <div className="registration-card">
          <div className="registration-header">
            <h1 className="registration-title">Create Account</h1>
            <p className="registration-subtitle">Join us today! Fill in your details below</p>
          </div>

          {showSuccess && <SuccessMessage name={formData.name} />}

          <div className="registration-form-wrapper">
            <div className="form-fields">
              <FormInput
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                error={touched.name ? errors.name : ''}
                isValid={touched.name && validFields.name}
                placeholder="Enter your full name"
                hint="Enter your full name"
              />

              <FormInput
                label="Email Address"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                error={touched.email ? errors.email : ''}
                isValid={touched.email && validFields.email}
                placeholder="you@example.com"
                hint="We'll never share your email"
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                error={touched.password ? errors.password : ''}
                isValid={touched.password && validFields.password}
                placeholder="Create a strong password"
                hint="At least 8 characters with uppercase, lowercase, number, and special character"
                passwordStrength={passwordStrength}
              />

              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : ''}
                isValid={touched.confirmPassword && validFields.confirmPassword}
                placeholder="Re-enter your password"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className={`submit-button ${isFormValid() && !isSubmitting ? 'submit-button-active' : 'submit-button-disabled'}`}
            >
              {isSubmitting ? (
                <span className="submit-button-content">
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="registration-footer">
            Already have an account?{' '}
            <a href="#" className="sign-in-link">
              Sign in
            </a>
          </div>
        </div>

        <div className="security-notice">
          <p>Protected by advanced validation and security measures</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;