// // M-1 :
// import {Protect, useClerk, useUser} from '@clerk/clerk-react'
// import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
// import React from 'react'
// import { NavLink } from 'react-router-dom';

// // for menu items data (path,text & icon) :
// const navItems = [
//   {to :'/ai', label :'Dashboard', Icon: House},
//   {to :'/ai/write-article', label :'Write Article', Icon: SquarePen},
//   {to :'/ai/blog-titles', label :'Blog Titles', Icon: Hash},
//   {to :'/ai/generate-images', label :'Generate Images', Icon: Image},
//   {to :'/ai/remove-background', label :'Remove Background', Icon: Eraser},
//   {to :'/ai/remove-object', label :'Remove Object', Icon: Scissors},
//   {to :'/ai/review-resume', label :'Review Resume', Icon: FileText},
//   {to :'/ai/community', label :'Community', Icon: Users},
// ]

// const Sidebar = ({sidebar,setSidebar}) => { // get data from propts (in layout.jsx)
  

//   // to get user from clerk :
//   const {user} =  useUser();
//   // to get signout and openuser profile form clerk :
//   const{signOut, openUserProfile} = useClerk()


   
//   return (
//     <div className={`w-60 bg-white border-r border-gray-200 flex
//     flex-col justify-between items-center max-sm:absolute top-14
//     bottom-0 ${sidebar ? 'translate-x-0' :'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}> 
       
//        {/* User Profile (div) : */}
//        {/* div for showing user profile and name in sidebar: */}
//        <div className='my-7 w-full'>
//         {/* user image: */}
//         <img src={user.imageUrl} alt="User avtar" className='w-13 rounded-full mx-auto' />
//         {/* users name: */}
//         <h1 className='mt-1 text-center'>{user.fullName}</h1>

//         {/* div for menu(nav) items : */}
//         <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
//           {/* #understand the code in this div: */}
//           {navItems.map(({to, label, Icon}) => ( // this arrow fun will return navlink tag
//             <NavLink key={to} to={to} end={to === '/ai'} onClick={()=>setSidebar(false)} className={({isActive}) => `px-3.5F
//             py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`}> 
            
//             {/* when we will click any (menu icon) it will hide the sidebar for small screen -> setSidebar(false) */}
//             {/* #isactive k use s jis menu k page pr rhega uska background color change hoga bakiyo se */}


//                {/* to display content inside this(navlink) tag : */}
//                {({isActive}) => (
//                 <>
//                 <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`}/>
//                 {label}
//                 </>
//                )}

//             </NavLink>
//           ))}

//         </div>
//        </div>

//        {/* #div for bootom part of sidebar : */}
//        <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center
//        justify-between'> 
//              {/* div for user details : */}
//              <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
//               <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
//               <div>
//                 <h1 className='text-sm font-medium'>{user.fullName}</h1>
//                 <p className='text-xs text-gray-500'>
//                   {/* if the plan is premium then only this will be shown other wise free */}
//                   <Protect plan='premium' fallback="Free">Premium</Protect> 
//                   Plan
//                 </p>
//               </div>


//              </div>
//              {/* #logout icon : */}
//              <LogOut onClick={signOut} className='w-4.5 text-gray-400
//              hover:text-gray-700 transition cursor-pointer'/>


//        </div>
      
//     </div>
//   )
// }

// export default Sidebar


// NOTE: M-1 m ye dikkat hai k jo menuicon-text k background hai uska styling thoda dikkt de rha hai uske baad m resolve krenge 






// M-2: Updated one from chatgpt ::

// Clerk se hooks aur Protect component import kiya
import { Protect, useClerk, useUser } from '@clerk/clerk-react';
// Sidebar me icons ke liye lucide-react se import kiya
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
// React import kiya
import React from 'react';
// NavLink import kiya routing ke liye
import { NavLink } from 'react-router-dom';

// Sidebar ke liye navigation items define kiye
const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },           // Dashboard page link
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen }, // Write Article link
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash }, // Blog Titles link
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image }, // Generate Images link
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser }, // Remove Background
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors }, // Remove Object
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText }, // Review Resume
  { to: '/ai/community', label: 'Community', Icon: Users }, // Community link
];

// Sidebar component start, sidebar & setSidebar props get kiye
const Sidebar = ({ sidebar, setSidebar }) => { // geting data from prompts (in layout.jsx)

  // to protect the page from non-loggedin user
  const { user, isLoaded } = useUser();  // Clerk se current user aur load status get kiya
  

  // Clerk se signOut aur openUserProfile functions get kiye
  const { signOut, openUserProfile } = useClerk(); 

  

  // while loading user data 
  // Agar user data load nahi hua ya user null hai, return null (ya loading spinner)
  if (!isLoaded || !user) {
    return null; // or loading spinner
  }

  return (

    //  sidebar div : Sidebar div start
    <div className={`w-60 bg-white border-r border-gray-200 flex
    flex-col justify-between items-center max-sm:absolute top-14
    bottom-0 ${sidebar ? 'translate-x-0' :'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}> 
       
      {/* User Profile (div) : */}  {/* Top user profile section */}
      <div className='my-7 w-full'>
        {/* User image */}
        <img src={user.imageUrl} alt="User avatar" className='w-13 rounded-full mx-auto' />
        {/* User name */}
        <h1 className='mt-1 text-center'>{user.fullName}</h1>

        {/* Navigation links */}
        <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to} // unique key for list
              to={to}  // route path
              end={to === '/ai'} // exact match for dashboard
              onClick={() => setSidebar(false)}  // click link -> close sidebar

              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded 
                ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`  // active link style
              }
            >
              {({ isActive }) => (
                <>
                  {/* Nav item icon */}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  {/* Nav item label */}
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom User Actions section */}
      <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
        {/* User profile click area */}
        <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
          {/* User image */}
          <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
          <div>
            {/* User name */}
            <h1 className='text-sm font-medium'>{user.fullName}</h1>
            {/* User plan with Protect component */}
            <p className='text-xs text-gray-500'>
              <Protect plan='premium' fallback="Free">Premium</Protect> Plan
            </p>
          </div>
        </div>

        {/* Logout icon */}
        <LogOut
          onClick={signOut} // logout function
          className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'
        />
      </div>
    </div>
  );
  // ye Sidebar component home page me mount hoga
};

// Sidebar component export
export default Sidebar;





