// Icons import kiye (lucide-react se)
import { Image, Sparkles } from 'lucide-react'
// React aur useState hook import
import React, { useState } from 'react'
// Backend API calls ke liye axios
import axios from 'axios'
// Clerk ke auth hook (token lene ke liye)
import { useAuth } from '@clerk/clerk-react';
// Notification ke liye react-hot-toast
import toast from 'react-hot-toast';

// axios ka base URL environment variable se set kiya (backend endpoint)
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const GenerateImages = () => {

  // Alag alag image styles ka ek array banaya (user select karega)
  // array for different image styles :
  const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realistic style', '3D style', 'Portrait style' ]

  // State variable for image style (default = "Realistic")
  const [selectedStyle, setSelectedStyle] = useState('Realistic') // initalised with frst value
  // State variable for input text (jo user type karega description)
  const [input, setInput] = useState('')
  
  // State variable for publishing toggle (false = private, true = public)
  // state variable for true or false => contain info about publishing the generated image in community:
  const [publish, setPublish] = useState(false) // by default false -> if true the generated image will be published in community


  // after backend other state variables :

  // State variables for API response aur UI handling
  const [loading, setLoading] = useState(false) // API call ke time spinner show karne ke liye
  const [content, setContent] = useState('') // Generated image ka URL store karega

  // Clerk se authentication token lene ka hook
  const {getToken} = useAuth()   

  // Form submit handler (jab user "Generate Image" button dabayega)
  const onSubmitHandler = async(e) =>{
    e.preventDefault();  // page reload na ho isliye

    try {
      setLoading(true)  // Spinner start
 
      // Prompt generate kiya (backend ko bhejna hai)
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

      // API call (backend ke /api/ai/generate-image endpoint pe POST)
      const {data} = await axios.post('/api/ai/generate-image', {prompt, publish}, // request body
      {headers:{Authorization: `Bearer ${await getToken()}`}} ) // Auth header

      // Agar success mila toh image set kar do
      if(data.success){
        // setContent(data.content) 
        setContent(data.image)  // chat gpt bola

      } else{
        toast.error(data.message) // error message show
      }      
      
    } catch (error) {
      toast.error(error.message) // network ya server error
    }
    setLoading(false)  // Spinner stop

  } 


  return (
    
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
          {/* Left column (Form) */}
          <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
            {/* Header */}
            <div className='flex items-center gap-3'>
              <Sparkles className='w-6 text-[#00AD25]'/>
              <h1 className='text-xl font-semibold'>AI Image Generator</h1>
            </div>
            {/* Input for description */}
            <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
    
            
            <textarea onChange={(e)=>setInput(e.target.value)} value={input} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm
            rounded-md border border-gray-300' placeholder='Describe what you want to see in the image...' required />
            
            {/* Style selection */}
            <p className='mt-4 text-sm font-medium'>Style</p>
           
            <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
            {/* Ye div ke andar saare style options (Realistic, Anime, Cartoon etc.) 
            dynamically render honge jo imageStyle array me diye gaye hain */}

              {imageStyle.map((item)=>(
              // imageStyle array ka har ek element (item) loop karke render hoga yaha `map` function use hua hai React me dynamic list banane ke liye                
                <span onClick={()=>setSelectedStyle(item)} 
                // jab bhi user kisi style par click karega to setSelectedStyle() function call hoga aur clicked style ko state me save karega           
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-green-50 text-green-700'  // agar yeh style selected hai to green background aur text
                : 'text-gray-500 border-gray-300'}`} // warna normal grey border aur text
                
                key={item}> {/* key={item} => React ko har element uniquely identify karne ke liye unique key dena padta hai */}
                {item} {/* style ka naam print hoga jaise 'Realistic', 'Anime style', etc. */}
                </span>
              ))}
            </div>

            {/* Toggle (Publish image publicly or not) */}
            {/* extra div for toggle button(checkbox) (publish wale k liye) : */}
            <div className='my-6 flex items-center gap-2'>
              {/* label tag: */}
              <label className='relative cursor-pointer'>
                {/* input-checkbox: */}
                <input type="checkbox" onChange={(e)=>setPublish(e.target.checked)}
                checked={publish} className='sr-only peer'/>

                {/* toggle buttom k styling k liye: */}
                <div className='w-9 h-5 bg-slate-300 rounded-full
                peer-checked:bg-green-500 transition'></div>

                <span className='absolute left-1 top-1 w-3 h-3 bg-white
                rounded-full transition peer-checked:translate-x-4'></span>
              </label>
              <p className='text-sm'>Make this image Public</p>

            </div>
    
             {/* Submit Button */}
            <button disabled={loading}
            className='w-full flex justify-center items-center gap-2
            bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6
            text-sm rounded-lg cursor-pointer'>

              {
                loading ? <span className='w-4 h-4 my-1 rounded-full border-2
                border-t-transparent animate-spin'></span> 
                : <Image className='w-5'/>

              }

              {/* <Image className='w-5'/> */}
              Generate Image
            </button>
    
          </form>
          
           {/* Right column (Generated image display) */}
          <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
          border-gray-200 min-h-96'>
            {/* Header */}
            <div className='flex items-center gap-3'>
              <Image className='w-5 h-5 text-[#00AD25]'/>
              <h1 className='text-xl font-semibold'>Generated image</h1>
            </div>
            
            {/* Agar image nahi hai toh placeholder text show karo */}
            {
              !content ? (

                 <div className='flex-1 flex justify-center items-center'>
                   <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                     <Image className='w-9 h-9'/>
                     <p>Enter a topic and click "Generate image" to get started</p>
                   </div>
                 </div>                

              ) : (

                <div className='mt-3 h-full'>
                  <img src={content} alt="image" className='w-full h-full' />
                </div>
              )

            }
            
    
            {/* <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Image className='w-9 h-9'/>
                <p>Enter a topic and click "Generate image" to get started</p>
              </div>
            </div> */}
    
          </div>
          
          
        </div>
  )
}

export default GenerateImages
