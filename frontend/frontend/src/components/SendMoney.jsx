import React from 'react'

export default function SendMoney() {
  return (
    <div className='relative top-8 border-2 w-80 h-64 flex flex-col items-center rounded-md '>
      <div className='p-4'>
      <p className='text-3xl font-bold '>
    Send Money
      </p>
      </div>
   
  
   <div className='relative top-12'>
    <p className='text-2xl font-bold '>
      Friend's Name
    </p>
    <p className=''>
      Amount in Rs:
    </p>
    <input className='w-72 rounded-md border-2'>
    </input>
    <div className='flex flex-col items-center py-2'>
    <button className='border-2 rounded-md w-32 bg-green-600 '>
      Send
    </button>
    </div>
    
</div>
    </div>
  )
}
