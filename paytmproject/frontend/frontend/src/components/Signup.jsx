import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password
      });
      if (response.status === 200) {
        alert("User created successfully");
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='flex flex-col justify-center bg-slate-500 relative top-8 w-72 rounded-lg '>
      <div className='flex flex-col items-center p-2'>
        <p className='text-black font-sans-serif text-2xl font-bold'>
          Sign Up
        </p>
        <p className='pt-5'>
          Enter your information to create an account
        </p>
      </div>
      <div className='flex flex-col py-4 gap-y-4'>
        <div>
          <p className='font-bold flex px-3 pb-3'>First Name</p>
          <input type='text' value={firstName} onChange={(e) => {
            setFirstName(e.target.value);
          }} className='rounded-md py-1 flex ml-4 pl-6' />
        </div>
        <div>
          <p className='font-bold flex px-3 pb-3'>Last Name</p>
          <input type='text' value={lastName} onChange={(e) => {
            setLastName(e.target.value);
          }} className='rounded-md py-1 flex ml-4 pl-6' />
        </div>
        <div>
          <p className='font-bold flex px-3 pb-3'>Email</p>
          <input type='text' value={username} onChange={(e) => {
            setUsername(e.target.value);
          }} className='rounded-md py-1 flex ml-4 pl-6' />
        </div>
        <div className='pb-4 '>
          <p className='font-bold flex px-3 pb-3'>Password</p>
          <input type='password' value={password} onChange={(e) => {
            setPassword(e.target.value);
          }} className='rounded-md py-1 flex ml-4 pl-6' />
        </div>
        <div className='flex flex-col items-center'>
          <button className='bg-black rounded-md w-60 justify-center h-8 place-self-center text-white' onClick={handleSignup}>Sign Up</button>
          <p> Already have an account? <Link className='font-bold underline' to="/signin">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}
