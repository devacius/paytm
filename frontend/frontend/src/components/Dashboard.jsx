import React from 'react';

export default function Dashboard() {
  return (
 <div className='pb-4'>
  <div className='flex flex-row w-full h-16 border-b-2'>
    <div className='absolute left-0'>
      <p className='text-3xl font-bold'>
      Payments Bank
      </p>
    
    </div>
    <div className='absolute right-0 top-16'>
      <p className='font-semi-bold text-xl'>
    Hello, User
      </p>
    </div>
  </div>
  <div className='py-4'>
    <div>
      <p className='text-2xl font-bold'>
        Your Balance:
      </p>
    </div>
    <div className='pt-2'>
      <div>
        <p className='text-2xl font-bold'>
          Users
        </p>
      </div>
    </div>
  </div>

 </div>
     
  
   
    
  );
}
