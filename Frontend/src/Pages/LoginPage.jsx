import React, { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import loginImage from '../../public/assets/Photos/loginPhoto.jpg';
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async() => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    
    if (!email.endsWith("@gmail.com")) {
      setError("Email must end with @gmail.com.");
      return;
    }

    setError(""); // Clear the error if validation passes

    const loginData = { email, password };
    console.log("Login Data:", loginData);
    try{
      const response = await axios.post('/api/users/login', loginData);
      console.log("Login Response:", response.data);
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate('/searchFlights');
    }catch(error) {
      console.error("Login Error:", error.response.data);
      setError(error.response.data.message || 'Error logging in.');
    }
    // You can later send loginData to the backend
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col sm:flex-row font-gilroy">
      {/* Left Section */}
      <section className="w-full md:w-[50%] bg-[#fff] order-2 overflow-y-auto flex-shrink-0 p-16">
        <div className="w-full">
          <div className="w-full h-full flex flex-col gap-5">
            <h2 className="font-poppins font-semibold text-2xl">LOGIN</h2>
            <div className="w-full h-full">
              <p>EMAIL</p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border-b-2 border-black mb-4 p-2"
              />
              <p>PASSWORD</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border-b-2 border-black mb-4 p-2"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <a
                href="https://www.instagram.com"
                className="text-[#525DE0] text-xs text-left block mb-4"
              >
                FORGET PASSWORD?
              </a>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-60 h-[1px] bg-[#000]"></div>
              <div className="mx-2">OR</div>
              <div className="w-60 h-[1px] bg-[#000]"></div>
            </div>
            
            <button onClick={handleLogin} className="bg-black text-[#FFF] w-full h-12 mb-4">
              LOGIN
            </button>
            <button onClick={() => navigate("/signup")} className="text-center">
              DON’T HAVE AN ACCOUNT? SIGN UP
            </button>
          </div>
        </div>
      </section>
      {/* Right Section */}
      <section
        className="w-full md:w-[50%] h-full order-1 bg-[#FFA31A] relative overflow-hidden flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        {/* Additional content can go here */}
      </section>
    </div>
  );
}
