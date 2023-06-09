import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function CloseFriend({userid}) {
  const PF=process.env.REACT_APP_PUBLIC_URL
  const [user,setUser]=useState({})
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${userid}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userid]);
  return (
    <div className="flex flex-col items-center mb-3">
      <img
        src={user.profilepic ? PF+user.profilepic:PF+"/assests/noavtar.png"}
        className="object-cover w-[80%]"
        alt=""
        srcSet=""
      />
      <Link to={`/profile/${user._id}`}>
      <span>{user.username}</span>
      </Link>
    </div>
  );
}
