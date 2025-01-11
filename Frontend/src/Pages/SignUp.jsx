import React, { useState } from "react"; // Import useState
import { FcGoogle } from 'react-icons/fc'; // Import Google icon
import loginImage from '/assets/Photos/loginPhoto.jpg';
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios';

export default function SignUp() {
    const navigate = useNavigate();

    // State variables to hold name, email, and password
    const [name, setName] = useState(""); // State for Name
    const [email, setEmail] = useState(""); // State for Email
    const [password, setPassword] = useState(""); // State for Password

    // Function to handle login button click
    const handleLogin = async() => {
        const signUpData = {
            name,
            email,
            password,
        };
        
        // You can use this loginData object to make an API call
        try{
          const response = await axios.post('/api/users/signup', signUpData);
          console.log("Response: ", response.data);
          alert(response.data.message);
          localStorage.setItem("token", response.data.token);
          navigate('/searchFlights');
        }catch(error) {
          console.error("Error:", error.response.data);
          alert(error.response.data.message || 'Error signing up.');
        }
        
    };

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col sm:flex-row font-gilroy">
            {/* Left Section */}
            <section className="w-full md:w-[50%] bg-[#fff] order-2 overflow-y-auto flex-shrink-0 p-16">
                <div className="w-full">
                    <div className="w-full h-full flex flex-col gap-5">
                        <h2 className="font-poppins font-semibold text-2xl">SIGNUP</h2>
                        <div className="w-full h-full">
                            <p>NAME</p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} // Update name state
                                className="w-full h-12 border-b-2 border-black mb-4 p-2"
                            />
                            <p>EMAIL</p>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Update email state
                                className="w-full h-12 border-b-2 border-black mb-4 p-2"
                            />
                            <p>PASSWORD</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Update password state
                                className="w-full h-12 border-b-2 border-black mb-4 p-2"
                            />
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
                        
                        <button 
                            onClick={handleLogin} // Handle login button click
                            className="bg-black text-[#FFF] w-full h-12 mb-4"
                        >
                            SIGNUP
                        </button>
                        <button onClick={() => navigate('/login')} className="text-center">
                            HAVE AN ACCOUNT ALREADY. LOGIN
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
