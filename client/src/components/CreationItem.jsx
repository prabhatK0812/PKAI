// React aur useState import kiya
import React, { useState } from 'react'
// Markdown component import kiya, taaki text content ko markdown format me render kar sake
import Markdown from 'react-markdown'
  

// Functional component CreationItem start
// item prop le raha hai, jo dashboard se aata hai (prompt, type, content, date, etc.)
const CreationItem = ({item}) => { // get item from prop

  // state variable for expanding creation detail:
  // State variable 'expanded' banaya, default false
  // Click karne par creation detail toggle hoga (expand/collapse)
  const [expanded, setExpanded] = useState(false) //  by default  creation detail will be collapsed

  return (
    
    // div for displaying the creation detail => Main container div for creation item
    // Clickable: onClick toggle expanded state
    <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border
    border-gray-200 rounded-lg cursor-pointer'>
    {/* #agr creation div ko click krenge tbhi content dikhega detail m expand ho k aur dubara click krne pr collapse ho jyega (kyuki'!' k use kiya h).*/}

      {/*  #Click karne par hi content dikhega (expand) #Dubara click par collapse*/}

      {/* Top row: prompt + type + date */}
      <div className='flex justify-between items-center gap-4'>
        {/* div for prompt, type & date: */}
        {/* Left: Prompt text + type & date */}
        <div>
          <h2>{item.prompt}</h2>
          {/* for type & date: */}
          <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
        {/* button in right side => Right: type button */}
        <button className='bg-[#EFF6FF] border border-[#BFDBFE]  text-[#1E40AF]
        px-4 py-1 rounded-full'>{item.type}</button>
      </div>

      

      {/* For creation details(content): */}
      {/* Creation details: only show if expanded = true */}
      
      { // if creation is expanded then only we will display the content(creation details)
        expanded && (
          <div>
            {item.type === 'image' ? ( // item-type image hoga uske liye => item-content m image show krenge (eg:text to image convertor k liye)
              // Agar item type image ho → show image
              <div>
                <img src={item.content} alt="image" className='mt-3 w-full max-w-md'/>
              </div>
            ) : ( // agr item-type image nhi rha tb div m item k contetn dikhayenge (eg: article ,resume k liye)
              // Agar item type image nahi → show markdown content
              <div className='mt-3 h-full overflow-y-scroll text-sm to-slate-700'>
                <div className='reset-tw'>
                  <Markdown>{item.content}</Markdown>
                </div>

              </div>

            )}
          </div>
          
        )
      }
      
    </div>
    // mount this component in dashboard.jsx file
  )
}

// Export component
export default CreationItem
