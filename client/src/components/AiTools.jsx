// React import kiya
import React from 'react'
// Assets me stored AI tools data import kiya
import { AiToolsData } from '../assets/assets'
// Navigate hook import kiya page redirect ke liye
import { useNavigate } from 'react-router-dom'
// Clerk se user info get karne ke liye hook
import { useUser } from '@clerk/clerk-react'

// AiTools component start
const AiTools = () => {
  // for tool-div :
  // navigate function banaya
  const navigate = useNavigate()
  // current logged-in user get kiya
  const {user} = useUser() // for user


  return (
    // Main container with padding and margin
    <div className='px-4 sm:px-20 xl:px-32 my-24'>

      {/* Title & description div centered */}
      {/* div for title & description (in center): */}
      <div className='text-center'>
        {/* Title: */}
        <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
        {/* Description: */}
        <p className='text-gray-500 max-w-lg mx-auto'>Everything you need to create, enhance, and optimise your content with
        cutting-edge AI technology.</p>
      </div>

      {/* Tools list container with flex wrap */}
      {/* div for displaying tools list in flex layout : */}
      <div className='flex flex-wrap mt-10 justify-center'>
         
        {/* Map through AiToolsData array to render individual tool divs */}
        {/* #for getting list of tools data from assets : */}
        {AiToolsData.map((tool,index)=>( // understand this part of code => arrow fun is returning a div -> in parameter(individual tool & index is passed)

          // tool-div for individual tool -> (with key property = index) : 
          // Individual tool container div
          <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE]
          shadow-lg border border-gray-100 hover:-translate-y-1 transition-all
          duration-300 cursor-pointer' onClick={()=> user && navigate(tool.path)}>
            
            {/* Tool icon */}
            {/* for displaying icon of tool : */}
            <tool.Icon className='w-12 h-12 p-3 to-white rounded-xl' 
            style={{background : `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`}}/>
            

            {/* for tool name & description : */}
            {/* Tool title */}
            <h3 className='mt-6 mb-3 text-lg font-semibold'>{tool.title}</h3>
            {/* Tool description */}
            <p className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</p>
          </div>

          // #In tool-div when the user is loggged in then only it will naviagte the user to other page -> when tool div is clicked (for onclick property). #only logged in user can naviagte to the path(of tool)
          // #In tool icon=> (style property is used to add gradient color in background)

        ))}


      </div>
      
    </div>
    // Mount this component in home.jsx
  )
}

// Component export
export default AiTools





