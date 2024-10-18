import React from 'react'
import Landingimg from '../assets/LandingIMG.svg'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <>
    <div className='flex flex-col lg:flex-row md:flex-row  gap-10 container  mx-auto max-h-fit px-4 lg:px-8 '>
        <div className='flex flex-col m-4 lg:text-7xl sm:text-2xl md:text-4xl'>
            <h1 className='text-darkest mt-16 ml-4 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl' >
                Task <br/> Management
            </h1>
                <div className='text-darkest ml-7 mt-4 text-sm sm:text-md md:text-lg lg:text-2xl'  style={{ color: '#00477F' }}>
                All time management begins with planning
                </div>
                <div className=' flex gap-8 mt-10 lg:mt-20 md:mt-20 ml-4 text-md sm:text-xl md:text-2xl lg:text-3xl '>
                <button className='bg-darkest text-white border p-3 lg:p-4' style={{ borderRadius: '17px' }}>
                  <Link to={'/auth/login'}>Log in</Link>
                </button>
                <button className='bg-darkest text-white border p-3 lg:p-4' style={{ borderRadius: '17px' }}>
                <Link to={'/auth/signup'}>Sign Up</Link>
                </button>
                </div>
        </div>
        <div className='mt-auto w-full items-center'>
        <img src={Landingimg} />
        </div>
    </div>
    
    </>
  )
}
