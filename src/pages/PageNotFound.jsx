import error from '../assets/404 Error Page not Found.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import notify from "../hooks/useNotification"

export default function PageNotFound() {
  const token = useSelector((state)=>state.auth.token)
  const nav = useNavigate()
  const goToDashboard = () => {
    if(token){
    nav('/');
    }else{
      notify(notify("Please Login", "error"))
      nav("/")
    }
  };
  return (
    <>
    <div className='grid grid-cols-2 w-full h-screen'>
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-customBlue900 font-bold text-[50px]'>404</h1>
        <h2 className='text-customBlue900 font-bold'>Ooops!</h2>
        <h2 className='text-customBlue900 font-bold'>Page Not Found</h2>
        <p className='text-gray-700 text-center font-semibold'>This page doesn't exist or was removed!</p>
        <button
        onClick={goToDashboard}
        type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-customlight focus:outline-none bg-customBlue900 rounded-full border border-gray-200 hover:bg-customBlue300 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-5">Back To Home</button>
    </div>
    <div className='flex justify-center items-center'>
    <img src={error} alt="Error 404" className='w-[400px] h-[400px]' />
    </div>
    </div>
    </>
  )
}
