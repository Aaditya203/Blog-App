import { Link } from 'react-router-dom'
import type {SignInSchema} from "../../../common/src/index"
import { useState } from 'react'
import { LabelledInput } from './LabelledInput'
import LoaderAnim from './LoaderAnim'

const SignInForm = () => {
    const [loading,setLoading] = useState(false);
    const [postInput,setPostInput] = useState<SignInSchema>({
        email:"",
        password:"",
    })
    
  return (
    <div className='flex justify-center items-center flex-col h-screen font-mono'>
        <div className='flex flex-col bg-white items-center justify-center w-100 whitespace-nowrap'>
            <div className='text-4xl font-extrabold mb-2 px-6'>Let's Get You Back In</div>
            <div className='text-md text-gray-500 mb-2'>Don't Have An Account? <Link to={'/signup'} className='underline font-semibold'>Create</Link></div>
        <LabelledInput label='Email' type="email" placeholder='Enter Your Email' onchange={(e)=>{
            setPostInput({
                ...postInput,
                email: e.target.value
            })
        }}/>
        <LabelledInput label='Password' type='password' placeholder='Enter Your Password' onchange={(e)=>{
            setPostInput({
                ...postInput,
                password: e.target.value
            })
        }}/>
        <button type="button" className="mt-5 w-full text-white bg-gray-950 box-border border border-transparent hover:shadow-lg hover:bg-black focus:ring-4 focus:ring-neutral-tertiary shadow-lg font-medium leading-5 rounded-lg text-md px-4 py-2.5 focus:outline-none">
            {loading ? <LoaderAnim/> : "Sign In"}
        </button>

        </div>
    </div>
  )
}



export default SignInForm