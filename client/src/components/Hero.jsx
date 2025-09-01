import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {

  // for button :
  const navigate = useNavigate() // use navigate hook

  return (
    // adding background through url => taking full height of screen

    // 🔹 MAIN WRAPPER DIV
    // - Full screen height lega (min-h-screen)
    // - Background image add kiya gradientBackground.png se
    // - Content center me dikhane ke liye flex-col + justify-center use kiya
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full 
    justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>
      
      {/* Title + Description Section */}
      {/* // div for title and description  -> (in center of screen): */}
      <div className='text-center mb-6'>
        
        {/* Heading / Title */}
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl
        font-semibold mx-auto leading-[1.2]'>Create amazing content <br/> with 
        
        {/* "AI tools" ko alag color (brand color) dene ke liye span use kiya */}
        {/* span is used to give different property to 'AI tools' */}
        <span className='text-primary'>AI tools</span></h1>
         {/* Description text niche */}
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto
        max-sm:text-xs text-gray-600'>Transform your content creation with our suite of premium AI tools.
        Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons Section */}
      {/* div for 2 buttons : */}
      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        
        {/* Primary Button : "Start creating now"
              - Ispe click karne par user ko '/ai' route pe navigate kar deta hai
              - Styling: bg-primary, hover/active par thoda scale effect
        */}
        
        {/* #when we will click on this button it will open new page (layout-> '/ai') -> for this use navigation fun : */}
        <button onClick={()=> navigate('/ai')} className='bg-primary text-white px-10 py-3
        rounded-lg hover:scale-102 active:scale-95 transition
        cursor-pointer'>Start creating now</button>
       
        {/* Secondary Button : "Watch demo"
              - Ye abhi sirf demo ke liye hai (functionality add kar sakte ho: modal ya video open kare)
              - Styling: white bg + border
        */}       
        {/* #when we will click on this button it will open demo video */}
        <button className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition
        cursor-pointer'>Watch demo</button>
      </div>

      {/* Trusted Users Section */}
      {/* div for users image : */}
      <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
       {/* user_group image (assets se import kiya) */}
       <img src={assets.user_group} alt="" className='h-8' /> Trusted by 10k+ people

      </div>



    </div>
    // Ab is Hero component ko Home.jsx ke andar mount karenge (homepage pe dikhane ke liye)
  )
}

export default Hero
