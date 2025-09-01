// React import kiya component banane ke liye
import React from 'react' 
// assets folder se saare assets import (yahan logo wagaira hote hain)
import { assets } from '../assets/assets'
// navigate karne ke liye hook (page redirect)
import {useNavigate} from 'react-router-dom'
// Icon import kiya (button me arrow ke liye)
import { ArrowRight } from 'lucide-react'

// For clerk :
// Clerk (Authentication) se functions/components import kiye
import {useClerk,UserButton,useUser} from '@clerk/clerk-react'

// Navbar component start
const Navbar = () => {

  // navigate hook use karke navigate function banaya (page redirect ke liye)
  const navigate = useNavigate() // 

  // Now we need the open signin in fun & user from clerk

  // clerk se current logged in user get kiya
  const {user} = useUser()   // getting user from useUser 
  // clerk ka openSignIn function (login form open karne ke liye)
  const {openSignIn} = useClerk() 
  // opensign in fun will be used in onclick property of button => to open sign in form after clicking login(getstarted) button



  return (
    // navigation bar fixed at top with blur background
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between
    items-center py-3 px-4 sm:px-20 xl:px-32'>

      {/* #when we will click logo it will open(redirected to) the home page */}
      {/* logo (left side). Click karne par home page pe navigate karega */}
      <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={()=> navigate('/')} />

      {/* #now when user is logged in show profile other wise show login button for this we will use terniary operator : */}
      
      {/* Agar user logged in hai to user profile button dikhao, warna "Get Started" button */}
      {
        
        // logged in hone par user profile button (photo) dikhega
        user ? <UserButton/> 
        : 
        ( // when user is not logged in : 
          // agar logged in nahi hai to login button dikhega

          // login button (in right) :
          <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm
          cursor-pointer bg-primary text-white px-10 py-2.5'>Get Started <ArrowRight 
          className='w-4 h-4' /> </button>  
          // button click karne par clerk ka sign-in form open hoga      
        )
      }

    </div>
    // ye Navbar component home page me mount hoga
  )
}

// component ko export kiya taki use dusre files me import kar saken
export default Navbar







