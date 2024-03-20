import React  from 'react';
import './App.css';
import { Route,BrowserRouter,Routes,useNavigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
const Signup=lazy(()=>import ('./components/Signup'));
const Signin=lazy(()=>import ('./components/Signin'));
const SendMoney=lazy(()=>import('./components/SendMoney'));
const Home=lazy(()=>import('./components/Home'));
const Dashboard=lazy(()=>import('./components/Dashboard'));
//import { ReactComponent as Loading } from "./assets/Loading.svg";
import Loading from './assets/Loading';
export default function App(){
  return (
    <div className='flex flex-col justify-center items-center' >
      <BrowserRouter>
      <Appbar/>
      <Routes>
      <Route path="/" element={<Suspense fallback={<Loading/>}><Home/></Suspense>} />
      <Route path="/signup" element={<Suspense fallback={<Loading/>}><Signup/></Suspense>} />
      <Route path="/signin" element={<Suspense fallback={<Loading/>}><Signin/></Suspense>} />
      <Route path="/send" element={<Suspense fallback={<Loading/>}><SendMoney/></Suspense>} />
      <Route path="/dashboard" element={<Suspense fallback={<Loading/>}><Dashboard/></Suspense>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
  function Appbar(){
    const navigate= useNavigate();
    return(
      <div className='relative top-0  bg-black  h-12 w-full scroll-m-0 '>
      <div className=' absolute  right-0 flex flex-row  justify-end  w-1/3 h-10 rounded border-4 border-indigo-500 divide-x-2 divide-blue-500'>
        <button className='bg-slate-700 text-white basis-1/3 hover:basis-1/2 'onClick={()=>{
          navigate("/");
        }}>
        Home
        </button>
        <button className='bg-slate-700 text-white basis-1/3 hover:basis-1/2 'onClick={()=>{
          navigate("/signup");
        }}>
        Signup
        </button>
        <button className='bg-slate-700 text-white basis-1/3 hover:basis-1/2 'onClick={()=>{
          navigate("/signin");
        }}>
        Signin
        </button>
        <button className='bg-slate-700 text-white basis-1/3 hover:basis-1/2 'onClick={()=>{
          navigate("/send");
        }}>
        Send Money
        </button>
        </div>
        </div>
        )
        }
}

