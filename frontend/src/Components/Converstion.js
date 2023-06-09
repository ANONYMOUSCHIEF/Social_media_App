import { Avatar } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {format} from 'timeago.js';
function Converstion({ own,item }) {
    const {text,createdAt,senderId}=item;
    const [sender,setSender]=useState({});
    const PF=process.env.REACT_APP_PUBLIC_URL;

    useEffect(() => {
        const fetchSender = async () => {
          const res = await axios.get(`/api/users/${senderId}`);
          setSender(res.data);
        };
        fetchSender();
      }, [senderId]);

    return (
        <>
            <div className={`flex my-5 mr-2 ${own ? "justify-end" : ''} `}>
                <div className="flex-col">
                    <div className="flex items-center">
                        <Avatar src={sender.profilpic?PF+sender.profilpic:PF+"/assests/noavtar.png"} />
                        <span className={`${own ? "bg-[#F5F1D8]" : "bg-[#1877f2]"} ${own ? "text-black" : "text-white"} ml-2 py-1 px-2 rounded-2xl w-60`}>{ text}</span>
                    </div>
                    <p className={`flex ${own ? "justify-end" : ''} `}>{format(createdAt)}</p>
                </div>
            </div>
        </>
    )
}

export default Converstion
