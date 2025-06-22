import React from 'react'
import MoonLoader from 'react-spinners/MoonLoader';

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-[60vh]'>
         <MoonLoader color="#6366f1" />
    </div>
   
  )
}

export default Loader