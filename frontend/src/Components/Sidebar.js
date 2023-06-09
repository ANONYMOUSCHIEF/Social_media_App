import React, { useContext, useEffect, useState } from 'react'
import FeedIcon from '@mui/icons-material/Feed';
import { Bookmark, CastForEducation, Chat, Event, Group, QuestionAnswer, VideoSettings, Work } from '@mui/icons-material';
import axios from 'axios';
import Friend from './Friend';
import {AuthContext} from "./AuthContext"
export default function Sidebar() {
  const {user:currentUser}=useContext(AuthContext)
  const[user,setUser]=useState({})
  const [allUser,setAllUser]=useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${currentUser._id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser._id]);

  useEffect(()=>{
    const fetchAllUser=async()=>{
      const getAllUser= await axios.get(`/api/users/`)
      setAllUser(getAllUser.data.filter((item)=>item._id !==user._id));
    }
    fetchAllUser();
  },[user._id])

  const allUserId=allUser.map((user)=>user._id);

  const suggestion = allUserId.filter((id)=>!user?.following?.includes(id))
  // console.log(user.following);
  console.log(suggestion);

  return (
    <div className='fixed top-14 w-3/12 left-0 overflow-y-scroll h-screen'>
    <div className='ml-6 pt-4 list-none'>
    <ul>
      <li className='mt-3'>
      <FeedIcon/>
      <span className='pl-3'>Feed</span>
      </li>
      <li className='mt-3'>
      <Chat/>
      <span className='pl-3'>Chat</span>
      </li>
      <li className='mt-3'>
      <Group/>
      <span className='pl-3'>Groups</span>
      </li>
      <li className='mt-3'>
      <VideoSettings/>
      <span className='pl-3'>Videos</span>
      </li>
      <li className='mt-3'>
      <Bookmark/>
      <span className='pl-3'>Bookmarks</span>
      </li>
      <li className='mt-3'>
      <QuestionAnswer/>
      <span className='pl-3'>Questions</span>
      </li>
      <li className='mt-3'>
      <Work/>
      <span className='pl-3'>Jobs</span>
      </li>
      <li className='mt-3'>
      <Event/>
      <span className='pl-3'>Events</span>
      </li>
      <li className='mt-3'>
      <CastForEducation/>
      <span className='pl-3'>Courses</span>
      </li>
    </ul>
      <button className='bg-slate-100 border-none p-[10px] mt-3 mb-3 font-[500] rounded-md'>Show more</button>
      <hr className='font-black h-5'/>
    </div>
    <div>
    <h3 className='font-bold text-slate-800 pl-3'>Suggestions</h3>
    {suggestion.map((id)=>{
      return <Friend key={user?._id} userid={id}/>
    })}
    </div>
    </div>
  )
}
