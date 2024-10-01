import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnhancedSignup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phonenumber.trim()) newErrors.phonenumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phonenumber)) newErrors.phonenumber = "Invalid phone number";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handle submit is workign')
    if (validateForm()) {
      try {
        console.log('handle submity is workign')
       const result = await axios.post('http://localhost:3000/signup',formData)
        // await new Promise(resolve => setTimeout(resolve, 1000));
        if(result){
          navigate(`/OTPVerificationPage?email=${encodeURIComponent(formData.email)}&role=${encodeURIComponent(formData.role)}`);
        }
      } catch (error) {
        console.error("Signup error:", error);
        setErrors(prev => ({ ...prev, api: "An error occurred. Please try again." }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex">
        {/* Left side - Form */}
        <div className="w-full md:w-3/5 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an account</h2>
          <p className="text-gray-600 mb-8">Join us today and start your journey!</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.firstname ? 'border-red-500' : ''}`}
                  placeholder="John"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
              </div>
              <div className="w-1/2">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.lastname ? 'border-red-500' : ''}`}
                  placeholder="Doe"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phonenumber"
                id="phonenumber"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.phonenumber ? 'border-red-500' : ''}`}
                placeholder="1234567890"
                value={formData.phonenumber}
                onChange={handleChange}
              />
              {errors.phonenumber && <p className="mt-1 text-sm text-red-600">{errors.phonenumber}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

 

            {errors.api && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {errors.api}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>

              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Image and text */}
        <div className="hidden md:block w-2/5 bg-cover bg-center" style={{backgroundImage: "url('https://wallpaperaccess.com/full/191366.jpg')"}}>
          <div className="h-full w-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-12">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-xl text-center">
              Your journey continues here. Log in to access your account and explore our amazing features.
            </p>
            <a href="/login" className="mt-8 px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSignup;