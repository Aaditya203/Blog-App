import { Link, useNavigate } from 'react-router-dom'
import type {SignUpSchema} from "../../../common/src/index"
import { useState } from 'react'
import { LabelledInput } from './LabelledInput'
import axios from 'axios'
import LoaderAnim from './LoaderAnim'
import { signup } from '@/services/auth.service'

const BACKEND_URL = "http://127.0.0.1:8787";

const SignUpForm = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUserName] = useState("");
    

    async function handleSubmit(){
        try{
            setLoading(true);
            const data = await signup(
                name,
                username,
                password,
                email
            )
            navigate("/blogs")
        }
        catch(e:any){
            alert(e.response.data.message);
        }
        finally{
            setLoading(false);
        }
    }
  return (
    <div className='flex justify-center items-center flex-col h-screen font-mono'>
        <div className='flex flex-col bg-white items-center justify-center w-100 whitespace-nowrap'>
            <div className='text-4xl font-extrabold mb-2 px-6'>Let's Get Started</div>
            <div className='text-md text-gray-500 mb-2'>Already Have An Account? <Link to={'/signin'} className='underline font-semibold'>Login</Link></div>
       
        <LabelledInput label='Username' placeholder='Enter Your UserName' onchange={(e)=>{
               setUserName(e.target.value);
            }}/>  
        <LabelledInput label='Name' placeholder='Enter Your Name' onchange={(e)=>{
                setName(e.target.value);
                
            }}/>  
        <LabelledInput label='Email' type="email" placeholder='Enter Your Email' onchange={(e)=>{
            setEmail(e.target.value)
        }}/>
        <LabelledInput label='Password' type='password' placeholder='Enter Your Password' onchange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <button onClick={handleSubmit} type="button" className="mt-5 w-full text-white bg-gray-950 box-border border border-transparent hover:shadow-lg hover:bg-black focus:ring-4 focus:ring-neutral-tertiary shadow-lg font-medium leading-5 rounded-lg text-md px-4 py-2.5 focus:outline-none">
            {loading ? <LoaderAnim/> : "Sign Up"}
        </button>

        </div>
    </div>
  )
}



export default SignUpForm