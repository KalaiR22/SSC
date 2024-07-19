import React from 'react'
import Hero from '../components/Hero'
import Service from '../components/Service'
import WhyChallenge from '../components/WhyChallenge'
import Explore from '../components/Explore'
import Footer from '../components/Footer'
import Challenges from '../components/Challenges'

export default function HomePage() {
  return (
    <div className=' absolute'>
      <Hero/>
      <Service/>
      <Challenges/>
      <WhyChallenge/>
      <Explore/>
      <Footer/>
      </div>
  )
}
