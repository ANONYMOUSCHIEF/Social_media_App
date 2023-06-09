import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_URL;
  const [user, setUser] = useState({})
  const userid = useParams().userid;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${userid}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userid]);

  return (
    <div className="m-0 p-0">
      <Navbar/>
      <div className="flex">
        <div className="w-3/12">
          <Sidebar />
        </div>
        <div className="w-9/12 mt-14">
          <div className="h-52 relative">
            <img
              className="h-full w-full object-cover"
              src={user.coverpic?PF+user.coverpic:PF+"/assests/nobg.jpeg"}
              alt={user.coverpic}
              srcSet=""
            />
            <Link to={`/profile/${userid}`}>
            <Avatar
              src={user.profilepic?PF+user.profilepic:PF+"/assests/noavtar.png"}
              style={{
                width: "125px",
                height: "125px",
                position: "absolute",
                top: "60%",
                left: "43%",
                zIndex: 4,
                borderRadius: "100%",
                border: "5px solid white",
              }}
            />
            </Link>
            <div className="flex flex-col items-center mt-10">
              <h1 className="font-[700]">{user.username}</h1>
              <span className="font-[300]">{user.description?user.description:<p>Write about Yourself</p>}</span>
            </div>
            <div className="flex mt-12">
              <div className="w-7/12">
                <Feed Profile userid={userid}/>
              </div>
              <div className="w-5/12">
                <Rightbar Profile/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
