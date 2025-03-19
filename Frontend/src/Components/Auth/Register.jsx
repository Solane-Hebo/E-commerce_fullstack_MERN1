import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../Store/userSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const fakeUser = {
        username: formData.username,
        email: formData.email,
      };
      const fakeToken = 'fakeAuthToken123';

      dispatch(login({ user: fakeUser, token: fakeToken }));
      localStorage.setItem('authToken', fakeToken);
      alert('Registration was successful!');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username:</label>
                <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" />
                {errors.username && <small className="text-danger">{errors.username}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password:</label>
                <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
