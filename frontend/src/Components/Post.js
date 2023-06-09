import { Favorite, MoreVert } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import RecommendIcon from "@mui/icons-material/Recommend";
import {Link} from 'react-router-dom';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import axios from "axios";
import {format} from 'timeago.js';
import { AuthContext } from "./AuthContext";
export default function Post({ post }) {
  const PF=process.env.REACT_APP_PUBLIC_URL;
  const { _id, userid, desc, img, likes,createdAt } = post;
  const [user, setUser] = useState({});
  const {user:currentUser}=useContext(AuthContext);
  const [like, setlike] = useState(false);
  const [countlike, setcountlike] = useState(likes.length);

  useEffect(()=>{
    setlike(likes.includes(currentUser._id));
  },[currentUser._id,likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${userid}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userid]);

  const handleClickLike = async () => {
     await axios.put(`/api/post/${_id}/like`,{userid:currentUser._id});
    like ? setcountlike(countlike - 1) : setcountlike(countlike + 1);
    setlike(!like);
  };

  return (
    <div className="mt-5">
      <div className="flex shadow-xl p-3 mx-2 justify-between ">
        <div className="flex items-center ">
        <Link to={`/profile/${userid}`}> <Avatar src={user.profilepic ? PF+user.profilepic:PF+"/assests/noavtar.png"} /></Link>
          <span className="pl-3 font-[600]">{user.username}</span>
          <span className="pl-3 font-[600]">{format(createdAt)}</span>
        </div>
        <div className="">
          <MoreVert />
        </div>
      </div>

      <div className=" overflow-x-hidden h-[450px] w-full px-2 pb-1   ">
        <img
          src={img && PF+"/"+img}
          className=" object-cover h-full w-full "
          alt={img}
          srcSet=""
          onDoubleClick={handleClickLike}
        />
      </div>
      <div className="bg-white mx-2 pb-3 font-serif font-[520]">
        <p>{desc}</p>
      </div>
      <div className="px-2 flex justify-between">
        <div className="">
          <RecommendIcon color="primary" onClick={handleClickLike} />
          {!like ? (
            <FavoriteBorderOutlinedIcon onClick={handleClickLike} />
          ) : (
            <Favorite color="warning" onClick={handleClickLike} />
          )}
          <span className="pl-2 font-[500]">{countlike} People like it</span>
        </div>
        <div className="">
          <span className="underline decoration-dashed">Comments</span>
        </div>
      </div>
    </div>
  );
}
