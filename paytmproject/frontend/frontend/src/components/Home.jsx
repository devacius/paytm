

import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col min-h-screen min-w-full justify-center items-center'>
      <div>
      <h1 className='text-3xl font-bold text-center'>Welcome to the Home Page</h1>
      <p className='text-center'>Click on the buttons below to navigate to the respective pages</p>
    </div>
        <div className='flex flex-row space-x-4 py-4 items-center '>
       <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-center' onClick={()=>{
          navigate('/signup');
        }
        }>
          Sign Up
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-center' onClick={()=>{
          navigate('/signin');
        }
        }>
          Sign In
        </button>
        </div>
    </div>

  )
}