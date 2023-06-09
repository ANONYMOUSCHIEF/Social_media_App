import { Avatar, Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Label, LocationOn, MoodOutlined, Photo } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import Post from "./Post";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import {  useParams } from "react-router-dom";
export default function Feed({ userid, Profile }) {
  const PF=process.env.REACT_APP_PUBLIC_URL;
  const { user } = useContext(AuthContext);
  const [userPost, setuserPost] = useState([]);
  const [timelinePost, settimelinePost] = useState([]);
  const id = useParams().userid;
  const postDesc=useRef();
  const [file,setFile]=useState(null)

  useEffect(() => {
    const userPostFetch = async () => {
      const res = await axios.get(`/api/post/myposts/${id}`);
      setuserPost(res.data.sort((a,b)=>{return new Date( b.createdAt)- new Date(a.createdAt)}));
    };
    userPostFetch();
  }, [userid, id]);


  useEffect(() => {
    const fecthPost = async () => {
      const res = user
        ? await axios.get(`/api/post/timeline/${user._id}`)
        : await axios.get(`/api/post/timeline/${userid}`);
      settimelinePost(res.data.sort((a,b)=>{return new Date( b.createdAt)- new Date(a.createdAt)}));
    };
    fecthPost();
  }, [userid, user]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newPost={
      userid:user._id,
      desc:postDesc.current.value
    }

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/api/post/", newPost);
    } catch (err) {}
    window.location.reload();
  }
  return (
    <div className="mt-14">
     {id===user._id  && <form onSubmit={handleSubmit} className=" h-max shadow-xl  p-3 mx-2 mt-6">
        <div className="flex items-center ">
          <Avatar alt="pic" src={user.profilepic? PF+user.profilepic:PF+"/assests/noavtar.png"}  />
          <input
          ref={postDesc}
            className="w-screen m-4 h-10  focus:outline-none"
            placeholder={`What is in Your mind ${user?.username} ?`}
          />
        </div>
        {file && <div className="h-[450px] w-full mb-10 ">
        <CancelIcon style={{flex:"end"}} onClick={()=>setFile(null)}/>
      <img src={URL.createObjectURL(file)} className="object-cover mt-2 h-full w-full " alt="" srcSet="" />
      </div>}
        <hr className="font-black ml-3 mt-3 mr-6 mb-3" />
        <div className="list-none flex space-x-2">
        <label htmlFor="file">
          <li className="">
            <Photo color="warning" />
            <span className="">Photo or Video</span>
            <input className="hidden"  type="file"  name="" id="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
          </li>
          </label>
          <li className="">
            <Label color="primary" />
            <span className="">Tag</span>
          </li>
          <li className="">
            <LocationOn color="success" />
            <span className="">Location</span>
          </li>
          <li className="">
            <MoodOutlined color="warning" />
            <span className="">Feelings</span>
          </li>
          <div />
          <Button type="submit" variant="contained" color="success">
            Share
          </Button>
        </div>
      </form>}
      {!Profile &&
        timelinePost.map((val) => {
          return <Post key={val._id} post={val} />;
        })}
      {Profile && userPost
        ? userPost.map((val) => {
            return <Post key={val._id} post={val} />;
          })
        : null}
    </div>
  );
}
