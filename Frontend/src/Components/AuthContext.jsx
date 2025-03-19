import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Skapa en kontext för autentisering
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('authToken', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validateForm = () => {
    let newErrors = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = 'Ogiltigt e-postformat';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Lösenord måste vara minst 6 tecken';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Lösenorden matchar inte';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulerad API-anrop
    setTimeout(() => {
      const fakeUser = { email: formData.email };
      const fakeToken = '123456';
      login(fakeUser, fakeToken);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="E-post" onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
        
        <input type="password" name="password" placeholder="Lösenord" onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
        
        <input type="password" name="confirmPassword" placeholder="Bekräfta lösenord" onChange={handleChange} />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registrerar...' : 'Registrera'}</button>
      </form>
    </div>
  );
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulerad API-anrop
    setTimeout(() => {
      if (formData.email === 'test@example.com' && formData.password === 'password123') {
        const fakeUser = { email: formData.email };
        const fakeToken = '123456';
        login(fakeUser, fakeToken);
        navigate('/dashboard');
      } else {
        setError('Ogiltigt e-post eller lösenord');
      }
      setIsSubmitting(false);
    }, 2000);
  };
  
  return (
    <div>
      <h1>Logga in</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="E-post" onChange={handleChange} />
        <input type="password" name="password" placeholder="Lösenord" onChange={handleChange} />
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Loggar in...' : 'Logga in'}</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export { Register, Login };
