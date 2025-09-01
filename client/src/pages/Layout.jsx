// // M-1 :

// import React, { useState } from 'react'
// import { Outlet, useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets'
// import { Menu, X } from 'lucide-react'
// import Sidebar from '../components/Sidebar'

// import { SignIn, useUser } from '@clerk/clerk-react' 

// const Layout = () => {

//   // naviagte fun :
//   const naviagte = useNavigate()

//   // state variable for side bar :
//   const [sidebar, setSidebar] = useState(false) // by default sidebar will be closed on small screen
//   // this is for small screen display of sidebar -> for terniary operator of object code


//   // for protection :
//   // to get user from clerk:
//   const {user} =  useUser();

 
//   // We have to protect his page so that only logged in user can access this page

//   return user ? ( // when user is logged in then we will display this content :
//     <div className='flex flex-col items-start justify-start h-screen'>

//       {/* #navaigation bar at top of page: */}
//       <nav className='w-full px-8 min-h-14 flex items-center justify-between
//       border-b border-gray-200'> 
//         <img className='cursor-pointer w-32 sm:w-44' src={assets.logo} alt=""  onClick={()=> naviagte('/')}/>
//         {/* if we will cilck on img it will naviagte to home page */}

//         {/* object: */}
//         {
//           sidebar ? <X onClick={()=>setSidebar(false)} className='w-6 h-6 
//           text-gray-600 sm:hidden'/> // if the sidebar is true(for small screen) display cross icon to close the sidebar => isko click krne pr sidebar ht jyega(small screen k liye)
//           : <Menu onClick={()=>setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/> // this icon will be hidden in full screen => isko click krne pr sidebar aa jyega
          
//           // NOTE : these icons will be hidden in full screen and dispayed on small screen only => dono icon pr onclick property lga di gyi h
//         }
//       </nav>

    
//       {/* SIDEBAR : */}
//       {/* #div for displaying the sidebar (left side) and other data in right side : */}
//       <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>

//         {/* mounting sidebar component & providing the propts: */}
//         <Sidebar sidebar={sidebar} setSidebar={setSidebar}/> 
        

//         {/* OUTLET: */}
//         {/* div for providing outlet : */}
//         <div className='flex-1 bg-[#F4F7FB]'>
//           <Outlet/>
//         {/* in this div different pages data(content) will come   */}
//         {/* #outlet is in this div which will change according to pages and side bar div will remain fixed : */}
//         </div>
//       </div>
        
//     </div>
    
//   ) : (  // when user is not logged in the we will display signin component.

//     <div className='flex items-center justify-center h-screen'>
//       <SignIn/>
//     </div>


//   )
// }

// export default Layout








// M-2 :: for chat gpt updated :

import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom' // Outlet = nested routes display, useNavigate = page navigation
import { assets } from '../assets/assets' // apne assets se logo/image import
import { Menu, X } from 'lucide-react' // menu & close icon for sidebar
import Sidebar from '../components/Sidebar' // Sidebar component import


// Clerk imports for authentication
import { useUser } from '@clerk/clerk-react'
import { SignIn } from '@clerk/clerk-react'


const Layout = () => {

  // naviagte fun => useNavigate hook -> function for redirecting pages
  const naviagte = useNavigate()

  // state variable for sidebar visibility (true = open, false = closed)
  const [sidebar, setSidebar] = useState(false) // by default sidebar will be closed on small screen
  // this is for small screen display of sidebar -> for terniary operator of object code

  // - by default sidebar closed on small screen
  // - toggle karne ke liye icons ka use hoga


  // 🔹 get logged-in user from Clerk
  const { user, isLoaded } = useUser()

  // 🔹 wait until user info is loaded
  if (!isLoaded) return null

  // 🔹 conditional render: only logged-in users can see layout  
  return user ? (  
    //  parent div -> flex column for navbar + content
    <div className='flex flex-col items-start justify-start h-screen'>

      {/* #NAVBAR bar at top of page: */}
      <nav className='w-full px-8 min-h-14 flex items-center justify-between
      border-b border-gray-200'> 
        {/* Logo -> click karne pe home page redirect */}
        <img className='cursor-pointer w-32 sm:w-44' src={assets.logo} alt=""  onClick={()=> naviagte('/')}/>
        {/* if we will cilck on img it will naviagte to home page */}

        {/* object: */}
        {/* Sidebar toggle icons (small screen) */}
        {
          sidebar ? <X onClick={()=>setSidebar(false)} className='w-6 h-6 
          text-gray-600 sm:hidden'/> // if the sidebar is true(for small screen) display cross icon to close the sidebar => isko click krne pr sidebar ht jyega(small screen k liye)
          // agar sidebar open hai -> X icon show hoga
          // click karne par sidebar close hoga          
          : <Menu onClick={()=>setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/> // this icon will be hidden in full screen => isko click krne pr sidebar aa jyega
          
          // agar sidebar close hai -> Menu icon show hoga
          // click karne par sidebar open hoga
          // NOTE: ye icons sirf small screen par dikhenge (sm:hidden)  => these icons will be hidden in full screen and dispayed on small screen only => dono icon pr onclick property lga di gyi h
        }
      </nav>

    
      {/* SIDEBAR : */}
      {/* #div for displaying the sidebar (left side) and other content in right side : */}
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>

        {/* mounting sidebar component & providing the propts: */}
        <Sidebar sidebar={sidebar} // pass sidebar state -> Sidebar visible ya hidden
        // Sidebar ke andar toggle karne ke liye function
        setSidebar={setSidebar}/> 
        

        {/* OUTLET: */}
        {/* div for providing outlet : */}
        {/* Outlet section -> nested routes ka content yahan show hoga */}
        <div className='flex-1 bg-[#F4F7FB]'>
          <Outlet/>
        {/* in this div different pages data(content) will come   */}
        {/* #outlet is in this div which will change according to pages and side bar div will remain fixed : */}
        {/* Outlet ka kaam: */}
        {/* Router ke nested pages ka content yahan render hoga */}
        {/* Sidebar div hamesha left me fixed rahega */}        
        </div>
      </div>
        
    </div>
    
  ) : (

    // 🔹 fallback if user not logged in
    <div className='flex items-center justify-center h-screen'>
      <SignIn/>
    </div>

  )

}

export default Layout
