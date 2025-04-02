import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();
  
  // Mock user database (in a real app, this would be in your backend)
  const mockUsers = [
    { name: 'Test User', email: 'test@example.com', password: 'password123' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    // Frontend-only validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (authMode === 'signup') {
      // Mock signup - just store in localStorage
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password // In real app, NEVER store plain passwords
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      // Mock login - check against our mock user
      const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        toast.success('Logged in successfully!');
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>
          {authMode === 'login' ? 'Login' : 'Sign Up'}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      
      {authMode === 'signup' && (
        <input 
          name="name"
          onChange={onChangeHandler} 
          value={formData.name} 
          type='text' 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Name' 
          required
        />
      )}
      
      <input  
        name="email"
        onChange={onChangeHandler} 
        value={formData.email} 
        type='email' 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        required
      />
      
      <input  
        name="password"
        onChange={onChangeHandler} 
        value={formData.password} 
        type='password' 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' 
        required
        minLength={6}
      />
      
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <Link to="/forgot-password" className='cursor-pointer hover:underline'>
          Forgot your password?
        </Link>
        {authMode === 'login' ? (
          <button type="button" onClick={() => setAuthMode('signup')} className='cursor-pointer hover:underline'>
            Create Account
          </button>
        ) : (
          <button type="button" onClick={() => setAuthMode('login')} className='cursor-pointer hover:underline'>
            Login Here
          </button>
        )}
      </div>
      
      <button type="submit" className='bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 transition'>
        {authMode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login;