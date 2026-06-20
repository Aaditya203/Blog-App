import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import  SignUp  from "./pages/SignUp"
import './App.css'
import SignIn from './pages/SignIn'
import Blogs from './pages/Blogs'
import Explore from './pages/Explore'
import Categories from './pages/Categories'
import About from './pages/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/home' element={<Blogs/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App
