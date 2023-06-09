import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link, redirect } from "react-router-dom";
import { Avatar, Badge } from "@mui/material";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const {user}=useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_URL;
  return (
    <div className=" flex bg-blue-500  top-0 items-center h-14 fixed w-full z-50 ">
      <div className="flex-[3] w-3/12">
        <Link to='/'>
          <li className="text-lg text-white m-6 list-none cursor-pointer ">
            AnonySocio
          </li>
        </Link>
      </div>
      <div className="flex-[5] w-5/12">
        <div className="bg-white flex rounded-3xl h-10 items-center pl-3">
          <SearchIcon className="text-lg" />
          <input
            placeholder="Search for post,friend and video"
            className=" w-full focus:outline-none pl-1 rounded-3xl "
          />
        </div>
      </div>
      <div className="w-4/12 flex cursor-pointer ">
        <div className="w-4/12 flex list-none text-white space-x-5 items-center">
          <li></li>
          <Link to="/">HomePage</Link>
          <Link to ="/">Timeline</Link>
        </div>
        <div className="w-8/12 flex justify-around ">
          <div className="flex text-white list-none pl-10 space-x-5 items-center">
            <li></li>
            <li>
              <Badge badgeContent={1} color="error">
                <PersonIcon />
              </Badge>
            </li>
            <li>
              <Badge badgeContent={1} color="error">
               <Link to="/chat"> <CommentIcon /></Link>
              </Badge>
            </li>
            <li>
              <Badge badgeContent={1} color="error">
                <NotificationsActiveIcon />
              </Badge>
            </li>
          </div>
          <Link to={`/profile/${user?user._id:null}`}>
          <Avatar alt="pic" src={user.profilepic? PF+user.profilepic:PF+"/assests/noavtar.png"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
