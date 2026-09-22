import React,{useState} from 'react'

const Login = () => {
  const [currentState, setcurrentState] =useState("Sign up");
  const onSubmitHandler =async(event) =>{
    event.preventDefault();

  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
    
    

    </form>

    
  )
}

export default Login