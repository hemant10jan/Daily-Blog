import React from 'react'
import { data, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import authService from '../appwrite/auth'
import { login as authLogin, login } from '../store/authSlice'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState("");

    const signup= async(data)=>{
        setError("");
        try{
            const userData=await authService.createAccount(data);
            if(userData){
                 const userData=await authService.getCurrentUser();
                if(userData){
                    dispatch(login(userData))
                    navigate("/")
                }
            }
        }
        catch(error){
            console.log(error);
            setError(error.message);
        }
    }
  return (
    <div className='flex items-center justify-center'>
         <div className={`mx-auto max-w-lg bg-gray-100 rounded-xl w-full p-10 border border-black/10`}>
         <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold'>
            Sign up into your account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
        Already have an account&nbsp;
        <Link to="/login" className='font-medium text-primary transition-all duration-200 hover:underline'>
        Log in
        </Link>
        </p>

        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
        <div className='space-7-5'>
            <Input
            label="Name:"
            placeholder="Enter your name"
            type="text"
            {...register("name",{
                required:true
            })}
            />
             <Input
                label="Email:"
                type="email"
                placeholder="Enter your email"
                {...register("email",{
                    required:true,
                    // validation:{
                    //     matchPattern:(value) => 
                    //     /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm. test(value) 
                    //     || "Email address nust be valid address",
                    // }
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
                 >Create Account</Button>
            </div>
        </form>

         </div>
    </div>
  )
}

export default Signup
