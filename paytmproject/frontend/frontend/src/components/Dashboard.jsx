import React from 'react';
import { Axios } from 'axios';
import { useState,useEffect } from 'react';
import {Navigate} from 'react-router-dom'
export default function Dashboard() {
  const [users,setUsers]=useState([]);
  const [filter,setFilter]=useState("");
  const [useramount,setuserAmount]=useState(0);
  useEffect(()=>{
    
    async () => {
      await Axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then(
        response => {
          setUsers(response.data.user);
        }
      )
     await Axios.get("http://localhost:3000/api/v1/account/balance").then(
        response =>{
          setuserAmount(response.data.useramount);
        }
      )
      
    }
  },[filter])
  return (
 <div className='flex flex-col items-center justify-center relative h-screen w-screen p-5'>
  <div className='flex flex-row h-28 w-11/12 rounded-md border-b-2 absolute top-4'>
    <div className='absolute left-1'>
      <p className='text-3xl font-bold'>
        Payments Bank
      </p>
    </div>
    <div className='absolute right-1'>
      <p>
        Hello, Users
      </p>
    </div>
  </div>
  <div className='absolute left-6 top-36 flex flex-row '>
    <p className='text-2xl font-bold'>
      Your balance:
    </p>
    <div className='px-2'>
      <p className='text-2xl font-semibold'>
      {useramount}

      </p>
    </div>
  </div>
  <div className='absolute left-5 top-44 pt-6 w-screen'>
    <p className='text-2xl font-semibold '>
      Users:  
    </p>
    <input className='border-2 w-11/12' onChange={(e)=>{
      setFilter(e.target.value);
    }
      }></input>
  </div>
  <div>
    {users.map(user => <User user={user}/>)}
  </div>
 </div>
     
  
   
    
  );
  function User({user}){
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <button label={"Send Money"} onClick={()=>{
              Navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}/>
        </div>
    </div>
  }
}
