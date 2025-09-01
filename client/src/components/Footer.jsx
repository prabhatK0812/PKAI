// React import kiya (functional component banane ke liye)
import React from 'react'
// Apna assets (logo etc.) import kiya
import { assets } from '../assets/assets'

// Footer component start
const Footer = () => {
  return (

    // pasted code from BuiltinUI :

    // <footer> tag jo pura footer section wrap karega
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
        {/* Upper section of footer: left (logo + text) and right (links + newsletter) */}
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
            {/* Left part: Logo and description */}
            <div className="md:max-w-96">
                {/* remove this src and add apna logo form assets : */}
                <img className="h-9" src={assets.logo} alt="logo"/> {/* Logo from assets folder */}

                {/* changes in description : */}
                {/* Short description text below logo */}
                <p className="mt-6 text-sm">
                  Experience the power of AI with PkAI. <br/> Transform your
                  content creation with our suite of premium AI tools. Write
                  articles, generate images, and enhance your workflow.
                </p>
            </div>
            {/* Right part: Company links and Newsletter */}
            <div className="flex-1 flex items-start md:justify-end gap-20">
                {/* Column 1: Company links */}
                <div>
                    <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                    <ul className="text-sm space-y-2">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Privacy policy</a></li>
                    </ul>
                </div>
                {/* Column 2: Newsletter subscription */}
                <div>
                    <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
                    {/* Newsletter info text */}
                    <div className="text-sm space-y-2">
                        <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                        {/* Input field + Subscribe button */}
                        <div className="flex items-center gap-2 pt-4">
                            <input className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder="Enter your email"/>
                            <button className="bg-primary w-24 h-9 text-white rounded cursor-pointer">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom copyright line */}
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
            Copyright 2025 ©Prabhat Kumar . All Right Reserved.
        </p>
    </footer>    

  )
}
// Footer component ko export kiya (Home page me mount karne ke liye)
export default Footer









