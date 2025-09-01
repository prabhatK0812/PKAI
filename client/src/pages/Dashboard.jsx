// Clerk ke Protect aur useAuth hooks import kiye authentication ke liye
import {Protect} from '@clerk/clerk-react'
// React aur hooks
import React, { useEffect, useState } from 'react'
// Dummy data (frontend testing ke liye)
import { dummyCreationData } from '../assets/assets'
// Icons import kiye Sparkles aur GemIcon ke liye
import {  GemIcon, Sparkles } from 'lucide-react'
// CreationItem component import kiya har creation display ke liye
import CreationItem from '../components/CreationItem'
// Axios import backend requests ke liye
import axios from 'axios'

import { useAuth } from '@clerk/clerk-react';
// Toast notifications import kiya error ya success messages ke liye
import toast from 'react-hot-toast';

// Backend base URL environment variable se set kiya
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {

  // State variable: user ki creations store karne ke liye
  const [creations, setCreations] = useState([])
  // Loading state: true hone par spinner show hoga
  const [loading, setLoading] = useState(true)
  // Clerk auth token get karne ke liye
  const {getToken} = useAuth()      

  // Function: backend se user creations fetch kare
  // function for getting creation data from assets(dummy data) :
  const getDashboardData = async()=>{
    // Optional: frontend testing ke liye dummy data set kar sakte
    // setCreations(dummyCreationData)

    // now we will get data from backend :

    try {
      // Backend request ke liye token provide kiya
      const {data} = await axios.get('/api/user/get-user-creations',
        {headers:{Authorization: `Bearer ${await getToken()}`}
      }) 
      
      if(data.success){
        // Agar response successful ho to creations state update kare
        setCreations(data.creations)
      } else {
        // Agar backend se error aaye to toast show kare
        toast.error(data.message)
      }

    } catch (error) {
      // Network ya other error handle
      toast.error(error.message)
      
    }
    // Request complete hone ke baad loading false kar de
    setLoading(false)


  }
 
  
  // useEffect: component mount hone par dashboard data fetch ho
  // to execute the fun whenever component is laoded
  useEffect(()=>{
    getDashboardData() // whenever the component is loaded => to display dashboard data on webpage
  },[])




  return (
    // Main container, scrollable aur padding 6
    // main div for content dispaly :
    <div className ='h-full overflow-y-scroll p-6'>
      {/* Top cards container: Total Creations & Active Plan */}
      {/* div for displaying total creation & active plan card : */}
      <div className='flex justify-start gap-4 flex-wrap'>

        {/* Total Creation Card (div) : */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
          {/* div for total creations => Left side: Text */}
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            {/* for no of creation: */}
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          {/* div for icon => Right side: Icon */}
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2]
          to-[#0BB0D7] text-white flex justify-center items-center'>
            {/* icon: */}
            <Sparkles className='w-5 text-white'/>
          </div>
        </div>

        {/* Active Plan Card (div) : */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
          {/* div for active plan => Left side: Plan text */}
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            {/* plan name: */}
            <h2 className='text-xl font-semibold'>
              {/* Clerk Protect component: premium plan users ke liye */}
              <Protect plan='premium' fallback="Free">Premium</Protect> 
              {/* fallback ek backup content hota hai jo uss case me dikhega jab protected content ke liye condition match na ho. */}
            </h2>
          </div>

          {/* div for icon => Right side: Icon */}
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5]
          to-[#9E53EE] text-white flex justify-center items-center'>
            <GemIcon className='w-5 text-white'/>
          </div>
        </div>  

      </div>


      {/* Conditional rendering: Loading spinner ya recent creations */}
      {
        loading ? (
          
          // Loading spinner div
          <div className='flex justify-center items-center h-3/4'>
            <div className='animate-spin rounded-full h-11 w-11 border-3
            border-purple-500 border-t-transparent'></div>
          </div>

        ) : (

           // div for recent creation => Recent Creations Section
           <div className='space-y-3'>
             <p className='mt-6 mb-4'>Recent Creations</p>
             
             {/* Map over creations array and render CreationItem component for each */}
             { // mounting creationitem component (inside a arrow function) => for displaying creations list :
               creations.map((item) => <CreationItem key={item.id} item={item}/>)
             }
           </div>          
        )

      }

      
      {/* #jb bs frontend th: */}
      {/* div for: */}
      {/* <div className='space-y-3'>
        <p className='mt-6 mb-4'>Recent Creations</p> */}
        {/* mounting creationitem component */}

        {/* {
          creations.map((item) => <CreationItem key={item.id} item={item}/>)
        }
      </div> */}
      
      
    </div>
  )
}

// Dashboard component export
export default Dashboard





