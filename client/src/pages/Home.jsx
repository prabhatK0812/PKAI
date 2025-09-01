import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testemonial from '../components/Testemonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    
    {/* #mounting components of home page : */}

      <Navbar/>
      <Hero/>
      <AiTools/>
      <Testemonial/>
      <Plan/>
      <Footer/>

      
    </>
  )
}

export default Home
