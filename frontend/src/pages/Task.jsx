import React from 'react'
import TaskHero from '../components/TaskHero'
import DailyTask from '../components/DailyTask'
import Footer from '../components/Footer'

export default function Task() {
  return (
    <div className='absolute'>
      <TaskHero/>
      <DailyTask/>
      <Footer/>
    </div>
  )
}
