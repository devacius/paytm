import React from 'react';
 import { FirstName } from '../atoms/FirstName';
 import { SecondName } from '../atoms/SecondName';
 import { Password } from '../atoms/Password';
 import { Username } from '../atoms/Username';
 import { RecoilRoot,useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

export default function Signup() {

  return (
    <div className='flex flex-col justify-center bg-slate-500 relative top-8 w-72 rounded-lg '>
      <div>
        <p className='text-black font-sans-serif text-2xl font-bold'>
          Sign Up
        </p>
        <p className='pt-5'>
          Enter your information to create an account
        </p>
      </div>
      <div className='flex flex-col py-4 gap-y-4'>
      <RecoilRoot>
        <Firstnamecounter/>
        <Secondnamecounter/>
        <Usernamecounter/>
        <Passwordcounter/>
      </RecoilRoot>

        <div>
        <button className='bg-black rounded-md w-60 justify-center h-8 place-self-center text-white' >sign up</button>
      
      <p> Already have an account? <Link  className='font-bold underline' to="/signin">Log in</Link></p>
        </div>
     
      
      </div>
    </div>
  )

}
function Firstnamecounter(){
  const[text,setText]=useRecoilState(FirstName);
  const onChange= (event)=>{
    setText(event.target.value);
  };
  return(
<div>
          <p className='font-bold flex px-3 pb-3'>First Name</p>
          <input type='text' value={text} onChange={onChange} className='rounded-md py-1 flex ml-4 pl-6'/>
          </div>
  );
}
function Secondnamecounter(){
  const[text,setText]=useRecoilState(SecondName);
  const onChange= (event)=>{
    setText(event.target.value);
  };
  return(
<div>
          <p className='font-bold flex px-3 pb-3'>Last Name</p>
          <input type='text' value={text} onChange={onChange} className='rounded-md py-1 flex ml-4 pl-6'/>
          </div>
  )
}
function Usernamecounter(){
  const[text,setText]=useRecoilState(Username);
  const onChange= (event)=>{
    setText(event.target.value);
  };
  return(
    <div>
          <p className='font-bold flex px-3 pb-3'>Email</p>
          <input type='text'value={text} onChange={onChange} className='rounded-md py-1 flex ml-4 pl-6'/>
          </div>
  )
}
function Passwordcounter(){
  const[text,setText]=useRecoilState(Password);
  const onChange= (event)=>{
    setText(event.target.value);
  };
  return(
    <div className='pb-4 '>
          <p className='font-bold flex px-3 pb-3'>Password</p>
          <input type='text' value={text} onChange={onChange} className='rounded-md py-1 flex ml-4 pl-6'/>
        </div>
     
  )
}





        
          
          
          