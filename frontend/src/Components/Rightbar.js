import { Avatar, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseFriend from "./CloseFriend";
import Friend from "./Friend";
import { Add, Remove } from "@mui/icons-material";
import { AuthContext } from "./AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function Rightbar({ Profile }) {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const id = useParams().userid;
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [isFollow, isFollowSet] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${currentUser._id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser._id]);
  
  useEffect(() => {
    isFollowSet(user?.following?.includes(id));
  }, [user.following, id])

  const handleClickFollow = async () => {
    !isFollow && await axios.put(`/api/users/${id}/follow`, { userid: currentUser._id })
    isFollow && await axios.put(`/api/users/${id}/unfollow`, { userid: currentUser._id })
    isFollowSet(!isFollow);
  };

  const ProfileContent = () => (
    <>
      <div className="flex ml-3 mt-14 mb-4 flex-col space-y-1">
        {user?._id !== id && (
          <Button
            onClick={handleClickFollow}
            sx={{ width: "110px", mb: "3px" }}
            variant="contained"
          >
            {!isFollow ? <p>Follow</p> : <p>Unfollow</p>}
            <span>{!isFollow ? <Add /> : <Remove />}</span>
          </Button>
        )}
        <h1 className="font-[700]">User Information</h1>
        <div className="">
          <span className="font-[400]">City: </span>
          <span className="font-[500]">{user ? user.city : "-"}</span>
        </div>
        <div className="">
          <span className="font-[400]">From: </span>
          <span className="font-[500]"> {user ? user.from : "-"}</span>
        </div>
        <div className="">
          <span className="font-[400]">Relationship: </span>
          <span className="font-[500]">
            {user
              ? user.relationship === 1
                ? "Single"
                : user.relationship === 2
                  ? "Married"
                  : "-"
              : "-"}
          </span>
        </div>
      </div>
      <div className="">
        <h1 className="font-[700] ml-3 mb-3">User friends</h1>
        <div className="grid grid-cols-3">
          {user
            ? user.following?.map((val, index) => {
              return <CloseFriend key={index} userid={val} />;
            })
            : null}
        </div>
      </div>
    </>
  );
  const HomeContent = () => (
    <>
      <div className="flex mb-3 mt-14 items-center">
        <img src={PF + "/assests/gift.jpg"} width={75} alt="" srcSet="" />
        <span>
          <strong>Sachin Verma</strong> and <strong>3</strong> more friend have
          a birthday today
        </span>
      </div>
      <div className="h-[10%] w-full">
        <img
          className="h-full w-full object-cover"
          src={PF + "/assests/noise.jpg"}
          alt="Advertisment"
        />
      </div>
      <div className="ml-3 list-none">
        <p className="font-[700]">Online friends</p>
        <Friend Rightbar />
        <Friend Rightbar />
        <Friend Rightbar />
        <Friend Rightbar />
        <Friend Rightbar />
        <Friend Rightbar />
      </div>
    </>
  );
  return (
    <div className="">{Profile ? <ProfileContent /> : <HomeContent />}</div>
  );
}
