import React from 'react'

// for PricingTable :
import { PricingTable } from '@clerk/clerk-react'


const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>

      {/* div for title & description: */}
      <div className='text-center'>
        {/* #title: */}
        <h2 className='text-slate-700 text-[42px] font-semibold'>Choose Your Plan</h2>
        {/* #despriction: */}
        <p className='text-gray-500 max-w-lg mx-auto'>Start for free and scale up as you grow. Find the perfect plan 
        for your content creation needs.</p>
      </div>

      {/* #div for displaying pricing table : */}
      <div className='mt-14 max-sm:mx-8'>
        {/* #mounting pricing table from clerk: */}
        <PricingTable/>
      </div>
      
    </div>
    // mount this component in home page(home.jsx file)
  )
}

export default Plan
