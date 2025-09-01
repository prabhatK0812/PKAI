import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'

// for getting token :
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

// imoprting toaster
import {Toaster} from 'react-hot-toast'

const App = () => {

  // for token :
  // const {getToken} = useAuth()
  // useEffect(()=>{
  //   getToken().then((token) =>console.log(token));    // gettoken fun will be executed wheneever the component is loaded
  // },[])


  return (
    <div>

      {/* adding toaster tag : */}
      <Toaster/>


      {/* #ROUTING : */}

      <Routes>
        {/* #self closing route : */}
        <Route path = '/' element={<Home/>} />
        {/* #nesting route : */}
        <Route path='/ai' element={<Layout/>}>
           {/* #self closing nested routes => sbme layout rhega kyuki wo parent route h in sb ka : */}
           <Route index element = {<Dashboard/>} />
           {/* #dashboard '/ai' (path) m h rhega */}
           <Route path='write-article' element = {<WriteArticle/>} />
           <Route path='blog-titles' element = {<BlogTitles/>} />
           <Route path='generate-images' element = {<GenerateImages/>} />
           <Route path='remove-background' element = {<RemoveBackground/>} />
           <Route path='remove-object' element = {<RemoveObject/>} />
           <Route path='review-resume' element = {<ReviewResume/>} />
           <Route path='community' element = {<Community/>} />
        </Route>
      </Routes>
      
    </div>
  )
}

export default App

