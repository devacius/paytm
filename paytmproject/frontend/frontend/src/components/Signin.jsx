import React, { useEffect, useState } from 'react';
import { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Signup() {
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");

  return (
    <div className='flex flex-col justify-center bg-slate-500 relative top-8 w-72 rounded-lg '>
      <div className='relative flex flex-col items-center p-3'>
        <p className='text-black font-sans-serif text-2xl font-bold'>
          Sign In
        </p>
        <p className='pt-5 px-1'>
          Enter your information to sign in to your account.
        </p>
      </div>
      <div className='flex flex-col py-4 gap-y-4'>
      <div>
          <p className='font-bold flex px-3 pb-3'>Email</p>
          <input type='text'value={username} onChange={(e)=>{
            setUsername(e.target.value);
          }} className='rounded-md py-1 flex ml-4 pl-6'/>
          </div>
          <div className='pb-4 '>
          <p className='font-bold flex px-3 pb-3'>Password</p>
          <input type='text' value={password} onChange={(e)=>{
            setPassword(e.target.value);
          }} className='rounded-md py-1 flex ml-4 pl-6'/>
        </div>
     

        <div className='flex flex-col items-center'>
        <button className='bg-black rounded-md w-60 justify-center h-8 place-self-center text-white' onClick={()=>{
          async () => {
            const response = await Axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              password
            });
            localStorage.setItem("token", response.data.token)
            Navigate("/dashboard")
          }
        }}>sign in</button>
       <p> Don't have an account?<Link  className='font-bold underline' to="/signup">Sign up</Link></p>
      
        </div>
     
      
      </div>
    </div>
  )

}






        
          
          
          