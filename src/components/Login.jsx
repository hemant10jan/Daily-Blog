import React,{useEffect, useState} from 'react'
import {login as authLogin} from "../store/authSlice"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logo from "./Logo"
import Input from "./Input"
import Button from "./Button"
import { useDispatch, useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
   const {register,handleSubmit}=useForm();
   const [error,setError]=useState("");

   const user=useSelector((state)=>state.auth.userData)

   const login= async(data)=>{
    setError("");
    try{
        const session=await authService.login(data);
        if(session){
            // console.log("Did we get session");
            const userData=await authService.getCurrentUser();
            if(userData){
                 console.log("Did we get user data");
                console.log(userData);
                dispatch(authLogin(userData));
                
                // setTimeout(()=>{
                    navigate("/")
                // },5)
               
            }
        }
    }
    catch(error){
        setError(error.message)
    }
   }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto max-w-lg bg-gray-100 rounded-xl w-full p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold'>
            Sign in into your account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
        Don&apos;t have any accout?&nbsp;
        <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
        Sign Up
        </Link>
        </p>

        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-7-5'>
                <Input
                label="Email:"
                type="email"
                placeholder="Enter your email"
                {...register("email",{
                    required:true,
                    validation:{
                        matchPattern:(value) => 
                        /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm. test(value) 
                        || "Email address nust be valid address",
                    }
                })} 
                 />
                 <Input
                 label="Password:"
                 type="password"
                 placeholder="Enter your password"
                 {...register("password",{
                    required:true
                 })}
                 />
                 <Button
                 type="submit"
                 className='w-full'
                 >Log in</Button>
            </div>
        </form>
        </div>
      
    </div>  
  )
}

export default Login
