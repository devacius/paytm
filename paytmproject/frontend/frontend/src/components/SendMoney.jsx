import React, { useState } from 'react'
import { Axios } from 'axios';
import { useSearchParams } from 'react-router-dom';
export default function SendMoney() {
  const [amount,setAmount]=useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <div className='relative top-8 border-2 w-80 h-64 flex flex-col items-center rounded-md '>
      <div className='p-4'>
      <p className='text-3xl font-bold '>
    Send Money
      </p>
      </div>
   
  
   <div className='relative top-12'>
    <p className='text-2xl font-bold '>
      {name}
    </p>
    <p className=''>
      Amount in Rs:
    </p>
    <input className='w-72 rounded-md border-2' onChange={(e)=>{
      setAmount(e.target.value);
    }}
    type="number" id="sendamount" placeholder='Enter amount'>
    </input>
    <div className='flex flex-col items-center py-2'>
    <button className='border-2 rounded-md w-32 bg-green-600 ' onClick={() => {
                        Axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                    }} >
      Send
    </button>
    </div>
    
</div>
    </div>
  )
}
