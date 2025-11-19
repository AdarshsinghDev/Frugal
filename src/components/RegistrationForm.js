import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import SuccessMessage from './SuccessMessage';
import { validateName, validateEmail, validatePassword, validateConfirmPassword, calculatePasswordStrength } from '../utils/validations';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    address: '',
    country: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    address: '',
    country: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
    termsAccepted: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    age: false,
    gender: false,
    address: false,
    country: false,
    state: false,
    city: false,
    password: false,
    confirmPassword: false,
    termsAccepted: false
  });

  const [validFields, setValidFields] = useState({
    name: false,
    email: false,
    age: false,
    gender: false,
    address: false,
    country: false,
    state: false,
    city: false,
    password: false,
    confirmPassword: false,
    termsAccepted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Countries data with India included
  const [countries, setCountries] = useState([
    { value: '', label: 'Select Country' },
    { value: 'in', label: 'India' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' }
  ]);

  const [states, setStates] = useState([{ value: '', label: 'Select State' }]);
  const [cities, setCities] = useState([{ value: '', label: 'Select City' }]);

  // India states and cities data
  const indiaData = {
    states: [
      { value: 'mh', label: 'Maharashtra' },
      { value: 'dl', label: 'Delhi' },
      { value: 'ka', label: 'Karnataka' },
      { value: 'tn', label: 'Tamil Nadu' },
      { value: 'up', label: 'Uttar Pradesh' },
      { value: 'gj', label: 'Gujarat' },
      { value: 'rj', label: 'Rajasthan' },
      { value: 'wb', label: 'West Bengal' },
      { value: 'ap', label: 'Andhra Pradesh' },
      { value: 'ts', label: 'Telangana' },
      { value: 'kl', label: 'Kerala' },
      { value: 'mp', label: 'Madhya Pradesh' },
      { value: 'hr', label: 'Haryana' },
      { value: 'pb', label: 'Punjab' },
      { value: 'br', label: 'Bihar' }
    ],
    cities: {
      mh: [
        { value: 'mum', label: 'Mumbai' },
        { value: 'pune', label: 'Pune' },
        { value: 'nag', label: 'Nagpur' },
        { value: 'nash', label: 'Nashik' }
      ],
      dl: [
        { value: 'new_delhi', label: 'New Delhi' },
        { value: 'dwarka', label: 'Dwarka' },
        { value: 'saket', label: 'Saket' }
      ],
      ka: [
        { value: 'bengaluru', label: 'Bengaluru' },
        { value: 'mysore', label: 'Mysore' },
        { value: 'hubli', label: 'Hubli' }
      ],
      tn: [
        { value: 'chennai', label: 'Chennai' },
        { value: 'coimbatore', label: 'Coimbatore' },
        { value: 'madurai', label: 'Madurai' }
      ],
      up: [
        { value: 'lucknow', label: 'Lucknow' },
        { value: 'kanpur', label: 'Kanpur' },
        { value: 'varanasi', label: 'Varanasi' }
      ],
      gj: [
        { value: 'ahmedabad', label: 'Ahmedabad' },
        { value: 'surat', label: 'Surat' },
        { value: 'vadodara', label: 'Vadodara' }
      ]
    }
  };

  // Other countries data
  const countriesData = {
    us: {
      states: [
        { value: 'ny', label: 'New York' },
        { value: 'ca', label: 'California' },
        { value: 'tx', label: 'Texas' },
        { value: 'fl', label: 'Florida' }
      ],
      cities: {
        ny: [
          { value: 'nyc', label: 'New York City' },
          { value: 'buf', label: 'Buffalo' },
          { value: 'roc', label: 'Rochester' }
        ],
        ca: [
          { value: 'la', label: 'Los Angeles' },
          { value: 'sf', label: 'San Francisco' },
          { value: 'sd', label: 'San Diego' }
        ]
      }
    },
    ca: {
      states: [
        { value: 'on', label: 'Ontario' },
        { value: 'bc', label: 'British Columbia' },
        { value: 'qc', label: 'Quebec' }
      ],
      cities: {
        on: [
          { value: 'tor', label: 'Toronto' },
          { value: 'ott', label: 'Ottawa' },
          { value: 'ham', label: 'Hamilton' }
        ]
      }
    }
  };

  // Update states based on selected country
  useEffect(() => {
    if (formData.country) {
      let countryStates = [];

      if (formData.country === 'in') {
        countryStates = indiaData.states;
      } else {
        countryStates = countriesData[formData.country]?.states || [];
      }

      setStates([{ value: '', label: 'Select State' }, ...countryStates]);
      setFormData(prev => ({ ...prev, state: '', city: '' }));
      setCities([{ value: '', label: 'Select City' }]);
    } else {
      setStates([{ value: '', label: 'Select State' }]);
      setCities([{ value: '', label: 'Select City' }]);
    }
  }, [formData.country]);

  // Update cities based on selected state
  useEffect(() => {
    if (formData.state) {
      let stateCities = [];

      if (formData.country === 'in') {
        stateCities = indiaData.cities[formData.state] || [];
      } else {
        stateCities = countriesData[formData.country]?.cities[formData.state] || [];
      }

      setCities([{ value: '', label: 'Select City' }, ...stateCities]);
      setFormData(prev => ({ ...prev, city: '' }));
    } else {
      setCities([{ value: '', label: 'Select City' }]);
    }
  }, [formData.state, formData.country]);

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

    if (touched.age) {
      const ageError = validateAge(formData.age);
      newErrors.age = ageError;
      newValid.age = !ageError;
    }

    if (touched.gender) {
      const genderError = validateGender(formData.gender);
      newErrors.gender = genderError;
      newValid.gender = !genderError;
    }

    if (touched.address) {
      const addressError = validateAddress(formData.address);
      newErrors.address = addressError;
      newValid.address = !addressError;
    }

    if (touched.country) {
      const countryError = validateCountry(formData.country);
      newErrors.country = countryError;
      newValid.country = !countryError;
    }

    if (touched.state) {
      const stateError = validateState(formData.state);
      newErrors.state = stateError;
      newValid.state = !stateError;
    }

    if (touched.city) {
      const cityError = validateCity(formData.city);
      newErrors.city = cityError;
      newValid.city = !cityError;
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

    if (touched.termsAccepted) {
      const termsError = validateTerms(formData.termsAccepted);
      newErrors.termsAccepted = termsError;
      newValid.termsAccepted = !termsError;
    }

    setErrors(newErrors);
    setValidFields(newValid);
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // Validation functions
  const validateAge = (age) => {
    if (!age) return 'Age is required';
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) return 'Please enter a valid age (1-120)';
    return '';
  };

  const validateGender = (gender) => {
    if (!gender) return 'Gender is required';
    return '';
  };

  const validateAddress = (address) => {
    if (!address.trim()) return 'Address is required';
    if (address.trim().length < 5) return 'Address must be at least 5 characters long';
    return '';
  };

  const validateCountry = (country) => {
    if (!country) return 'Country is required';
    return '';
  };

  const validateState = (state) => {
    if (!state) return 'State is required';
    return '';
  };

  const validateCity = (city) => {
    if (!city) return 'City is required';
    return '';
  };

  const validateTerms = (termsAccepted) => {
    if (!termsAccepted) return 'You must accept the Terms & Conditions';
    return '';
  };

  const isFormValid = () => {
    return validFields.name &&
      validFields.email &&
      validFields.age &&
      validFields.gender &&
      validFields.address &&
      validFields.country &&
      validFields.state &&
      validFields.city &&
      validFields.password &&
      validFields.confirmPassword &&
      validFields.termsAccepted;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched to show errors
    const allTouched = Object.keys(touched).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Final validation check
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const ageError = validateAge(formData.age);
    const genderError = validateGender(formData.gender);
    const addressError = validateAddress(formData.address);
    const countryError = validateCountry(formData.country);
    const stateError = validateState(formData.state);
    const cityError = validateCity(formData.city);
    const passwordError = validatePassword(formData.password);
    const confirmError = validateConfirmPassword(formData.confirmPassword, formData.password);
    const termsError = validateTerms(formData.termsAccepted);

    if (nameError || emailError || ageError || genderError || addressError ||
      countryError || stateError || cityError || passwordError || confirmError || termsError) {
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
          age: '',
          gender: '',
          address: '',
          country: '',
          state: '',
          city: '',
          password: '',
          confirmPassword: '',
          termsAccepted: false
        });
        setTouched({
          name: false,
          email: false,
          age: false,
          gender: false,
          address: false,
          country: false,
          state: false,
          city: false,
          password: false,
          confirmPassword: false,
          termsAccepted: false
        });
        setValidFields({
          name: false,
          email: false,
          age: false,
          gender: false,
          address: false,
          country: false,
          state: false,
          city: false,
          password: false,
          confirmPassword: false,
          termsAccepted: false
        });
        setShowSuccess(false);
        setPasswordStrength('');
        setStates([{ value: '', label: 'Select State' }]);
        setCities([{ value: '', label: 'Select City' }]);
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
            <form onSubmit={handleSubmit} className="registration-form">
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
                  hint="Enter your full name as per official documents"
                />

                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  error={touched.email ? errors.email : ''}
                  isValid={touched.email && validFields.email}
                  placeholder="you@example.com"
                  hint="We'll never share your email with anyone else"
                />

                <FormInput
                  label="Age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={() => handleBlur('age')}
                  error={touched.age ? errors.age : ''}
                  isValid={touched.age && validFields.age}
                  placeholder="Enter your age"
                  hint="Must be between 1 and 120 years"
                  min="1"
                  max="120"
                />

                <div className="form-input-group">
                  <label className="form-input-label">Gender <span className="required-asterisk">*</span></label>
                  <div className="gender-options">
                    {['Male', 'Female', 'Other'].map(gender => (
                      <label key={gender} className="gender-option">
                        <input
                          type="radio"
                          name="gender"
                          value={gender.toLowerCase()}
                          checked={formData.gender === gender.toLowerCase()}
                          onChange={handleChange}
                          onBlur={() => handleBlur('gender')}
                          className="gender-radio"
                        />
                        <span className="gender-label">{gender}</span>
                      </label>
                    ))}
                  </div>
                  {touched.gender && errors.gender && (
                    <div className="form-input-error">{errors.gender}</div>
                  )}
                </div>

                <FormInput
                  label="Address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={() => handleBlur('address')}
                  error={touched.address ? errors.address : ''}
                  isValid={touched.address && validFields.address}
                  placeholder="Enter your complete address"
                  hint="Include street, area, and landmark for better accuracy"
                />

                <div className="location-fields">
                  <div className="form-input-group">
                    <label className="form-input-label">Country <span className="required-asterisk">*</span></label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      onBlur={() => handleBlur('country')}
                      className={`form-select ${touched.country && errors.country ? 'form-select-error' : ''} ${touched.country && validFields.country ? 'form-select-valid' : ''}`}
                    >
                      {countries.map(country => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    {touched.country && errors.country && (
                      <div className="form-input-error">{errors.country}</div>
                    )}
                  </div>

                  <div className="form-input-group">
                    <label className="form-input-label">State <span className="required-asterisk">*</span></label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      onBlur={() => handleBlur('state')}
                      className={`form-select ${touched.state && errors.state ? 'form-select-error' : ''} ${touched.state && validFields.state ? 'form-select-valid' : ''}`}
                      disabled={!formData.country}
                    >
                      {states.map(state => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {touched.state && errors.state && (
                      <div className="form-input-error">{errors.state}</div>
                    )}
                    {!formData.country && (
                      <div className="form-input-hint">Select a country first</div>
                    )}
                  </div>

                  <div className="form-input-group">
                    <label className="form-input-label">City <span className="required-asterisk">*</span></label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={() => handleBlur('city')}
                      className={`form-select ${touched.city && errors.city ? 'form-select-error' : ''} ${touched.city && validFields.city ? 'form-select-valid' : ''}`}
                      disabled={!formData.state}
                    >
                      {cities.map(city => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                    {touched.city && errors.city && (
                      <div className="form-input-error">{errors.city}</div>
                    )}
                    {!formData.state && (
                      <div className="form-input-hint">Select a state first</div>
                    )}
                  </div>
                </div>

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
                  hint="Must match the password above"
                />

                <div className="form-input-group terms-group">
                  <label className="terms-checkbox">
                    <input
                      type="checkbox"
                      id="terms"
                      data-testid="terms-checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      onBlur={() => handleBlur('termsAccepted')}
                    />
                    <span className="terms-checkbox-label">
                      I agree to the <a href="#" className="terms-link">Terms & Conditions</a> <span className="required-asterisk">*</span>
                    </span>
                  </label>
                  {touched.termsAccepted && errors.termsAccepted && (
                    <div className="form-input-error">{errors.termsAccepted}</div>
                  )}
                </div>
              </div>

              <button
                id="submitBtn"
                data-testid="submit-button"
                type="submit"
                className={`submit-button ${isFormValid() && !isSubmitting ? 'submit-button-active' : 'submit-button-disabled'}`}
              >
                {isSubmitting ? (
                  <span className="submit-button-content">
                    <div className="button-spinner"></div>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          <div className="registration-footer">
            <p>Already have an account?{' '}
              <a href="#" className="sign-in-link">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        <div className="security-notice">
          <div className="security-icon">🔒</div>
          <p>Your data is protected by advanced encryption and security measures</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;