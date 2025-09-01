// Required imports
import {Edit, Sparkles} from 'lucide-react'  // Icons use ke liye (Edit, Sparkles)
import React, { useState } from 'react'  // React aur useState hook

import axios from 'axios' // API call ke liye
import { useAuth } from '@clerk/clerk-react'; // Clerk se auth token lene ke liye
import toast from 'react-hot-toast'; // Notification dikhane ke liye
import Markdown from 'react-markdown';  // Markdown content ko render karne ke liye

// adding backend url => Backend URL environment variable se set kar rahe hai
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {

  // Functional component :
  // array for storing article length
  const articleLength = [ 
    // Article length ke options
    {length:800, text: 'Short (500-800 words)'},
    {length:1200, text: 'Medium (800-1200 words)'},
    {length:1600, text: 'Long (1200+ words)'}
  ]

  // state variable for length & input :

  // State: selected article length (default pehla option)
  const [selectedLength, setSelectedLength] = useState(articleLength[0]) //  by default first length(800) selected rhega initially
  // State: user ka input for article topic
  const [input, setInput] = useState('') // input data k liye => initally empty rhega
  // jb bhi input field m kuch bhi likhenge data is input variable m store ho jyega onchange property k wjh s

  // some other states after backend :

  // State: loading spinner show karne ke liye
  const [loading, setLoading] = useState(false)   // it will take some time to upload content thats why we are using loading state => by default it will be false(initially when no req is send)
  // State: AI-generated article content store karne ke liye
  const [content, setContent] = useState('')      // for ai generated cotent (initially it will be empty string)

  // adding token to authenticate the api request :
  // Clerk authentication token ke liye
  const {getToken} = useAuth()  // from this useauth we will get the gettoken fun
  // by using this getToken we can get the token to provide in api req


  // Submit k liye => Form submit handler
  const onSubmitHandler = async(e) =>{  // it will be executed when we submit the data
    e.preventDefault(); // to prevent the web page from reloading when input is submitted => Page reload rokne ke liye

    // after backend :

    try{

      // first we will set loading true(on submission)
      setLoading(true) // Loading spinner show karenge

      // adding prompt =>  AI prompt construct kar rahe hai
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      // making api call & extracting data from api response =>  API call to backend AI endpoint
      // Prompt aur length bhej rahe
      const {data} = await axios.post('/api/ai/generate-article', {prompt, length:selectedLength.length}, {   // in this we will give path of api provide prompt & length then we will add authorization to authorize api req.
        headers: {Authorization:`Bearer ${await getToken()}`} // Auth header
      })
      
      // Agar response successful hai
      if(data.success){
        setContent(data.content)  // provide data content => Generated content state me save
      } else{
        toast.error(data.message) // Error show karenge
      }

    } catch(error) {
      toast.error(error.message) // Network ya API error show karenge
    }

    // in last after execution set loading false (jb contnent generate ho jyega uske baad )
    setLoading(false)   // Loading spinner hide karenge

    // now we will display contnet on right column

  }





  return (
    // Main container: flex layout 2 columns + vertical scroll
    // main div => jo do columns m content ko dikhyega :
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>

      {/* Left column: Form */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        {/* div for title & icon => Title aur icon*/}
        <div className='flex items-center gap-3'>
          {/* Decorative icon */}
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          {/* Section title */}
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>
        {/* text for article topic =>  Article topic input  */}
        <p className='mt-6 text-sm font-medium'>Article Topic</p>

        {/* input field: */}
        <input onChange={(e)=>setInput(e.target.value)} // Input state update
        value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm
        rounded-md border border-gray-300' placeholder='The future of artifical intelligence is...' required />
        


        {/* text for article length =>  Article length selection */}
        <p className='mt-4 text-sm font-medium'>Article Length</p>


        {/* div for showing article length: */}
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {articleLength.map((item,index)=>( // map m arrow fun k use krnge => individual item & index pass krenge as para
            <span onClick={()=>setSelectedLength(item)} // span tag m item.text & onclick property k use krenge jisme length fun k use hoga
            className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-50 text-blue-700' : 
           'text-gray-500 border-gray-300'}`} 
            key={index}>{item.text}</span>
          ))} 
        </div>
        <br/>

        {/* Generate Article button */}
        <button  disabled={loading} className='w-full flex justify-center items-center gap-2
        bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6
        text-sm rounded-lg cursor-pointer'>
        {/* (it will be disbaled until the loading is true => once content is generated it will be enabled) */}

          {/* updating button for laoding state : */}

          { // when loading is true :
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2
            border-t-transparent animate-spin'></span>

            // when loading is false :
            :  <Edit className='w-5'/>

          }
          
          {/* <Edit className='w-5'/>  => before backend */} 
          Generate article
        </button>

      </form>



      {/* Right column: Generated article */}

      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
      border-gray-200 min-h-96 max-h-[600px]'>
        {/* div for icon & title: */}
        {/* Header */}
        <div className='flex items-center gap-3'>
          {/* icon: */}
          <Edit className='w-5 h-5 text-[#4A7AFF]'/>
          {/* title: */}
          <h1 className='text-xl font-semibold'>Generated article</h1>
        </div>

       
        {/* #terniary operator : */}
        {/* Content display */}
        {!content ? (  
            // Jab content generate nahi hua
            // this div will be shown until the content is not generated :
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Edit className='w-9 h-9'/>
                <p>Enter a topic and click "Generate article" to get started</p>
              </div>
            </div>          
    
        ) : (
          // Jab content available hai
          // this div will be shown when content is generated :
          <div className='mt-3 h-full overflow-scroll text-sm text-slate-600'>
            <div className='reset-tw'>
              {/* for formatting content in structure & disable tailwind classes : */}
              <Markdown>{content}</Markdown>
            </div>
          </div>

        ) }



        {/* #ye wala div backend bnane k baad terniary operator m daal diye taki jb content nhi dikhana ho tbhi ye div dikhe*/}

        {/* <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Edit className='w-9 h-9'/>
            <p>Enter a topic and click "Generate article" to get started</p>
          </div>
        </div> */}

      </div>
      
      
    </div>
  )
}

// Export component
export default WriteArticle


