import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import { Bell, ChevronDown, PencilLine, PenSquare } from 'lucide-react'
const NavBar = () => {
  return (
    <div className='flex justify-between items-center  px-15 py-3 shadow-sm'>
        <div className='flex justify-between gap-20 items-center' >
            <div className='font-noto text-3xl font-bold'>BLOGIFY.</div>
            <div className=' flex justify-between items-center gap-15 font-mono text-gray-700 pl-25'>
                <NavLink to={'/home'} className='hover:text-black'>Home</NavLink>
                <NavLink to={'/explore'} className='hover:text-black'>Explore</NavLink>
                <NavLink to={'/categories'} className='hover:text-black'>Categories</NavLink>
                <NavLink to={'/about'} className='hover:text-black'>About</NavLink>
            </div>
        </div>
        <div className='flex flex-row items-center justify-between gap-10'>
            <div className='pr-10'><SearchBar/></div>

            <div className="flex items-center gap-3 rounded-lg bg-black px-4 py-2 text-white font-medium hover:scale-105 transition font-mono">
            <PencilLine size={17} />
            Write
          </div> 

            <div>
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-black"/>
                </button>
            </div>
            <div>
                <button className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-semibold">
                    AS
                    </div>

                    <ChevronDown size={16} className="text-gray-500" />
                </button>
            </div>
        </div>
    </div>
  )
}

export default NavBar