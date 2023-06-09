import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Feed from '../Components/Feed'
import Rightbar from '../Components/Rightbar'


export default function Home() {
  return (
    <div className='m-0 p-0'>
      <div className="w-full">
        <Navbar/>
      </div>
      <div className="w-full flex">
      <div className="w-3/12">
        <Sidebar/>
      </div>
      <div className="w-5/12">
        <Feed />
      </div>
      <div className="w-4/12">
        <Rightbar/>
      </div>
      </div>
      
    </div>
  )
}
