import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../Components/Navbar'
import Friend from '../Components/Friend'
import { Button, TextField } from '@mui/material';
import { AuthContext } from '../Components/AuthContext';
import Converstion from '../Components/Converstion';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import {io} from 'socket.io-client';

function Chat() {
    const chatText = useRef();
    const { user: currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const a = [1, 2, 3, 4, 5, 6, 7];
    const [currentChatId, setcurrentChatId] = useState(null);
    const [userConverstion, setUserConverstion] = useState([]);
    const [userChats, setUserChats] = useState([]);
    const [onlineFriend,setOnlineFriend]=useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket=useRef();
    const scrollBar=useRef();


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
          setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
          });
        });
      }, []);
    
      useEffect(() => {
        arrivalMessage &&
        userConverstion.find((c)=>c._id===currentChatId)?.members?.includes(arrivalMessage.sender) &&
        setUserChats((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage,userConverstion,currentChatId]);
      useEffect(() => {
       user._id && socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineFriend(
            user?.followings?.filter((f) => users.some((u) => u.userId === f))
          );
        });
      }, [user]);

      useEffect(() => {
        scrollBar.current?.scrollIntoView({ behavior: "smooth" });
      }, [userChats]);
    

    const NoCurrentChat = () =>
    (<div className="flex-col w-5/12 mt-4 items-center ">
        <p className='text-[50px] text-[#9b9696] w-[50%]'>Start Sending Messages <SendIcon style={{ fontSize: '50px' }} /></p>
    </div>)

    useEffect(() => {
        const getUser = async () => {
            const fetchUser = await axios.get(`/api/users/${currentUser?._id}`)
            setUser(fetchUser.data);
        }
        getUser();
    }, [currentUser._id])

    useEffect(() => {
        const getConverstions = async () => {
            const fetchConverstion = await axios.get(`/api/converstion/${currentUser?._id}`)
            setUserConverstion(fetchConverstion.data);
        }
        getConverstions();
    }, [currentUser._id]);



    useEffect(() => {
        const getChats = async () => {
            const fetchChats = await axios.get(`/api/chat/${currentChatId}`);
            setUserChats(fetchChats.data);
        }
        getChats();
    }, [currentChatId])
    const handleChatSubmit = (e) => {
        e.preventDefault();
        const newChat = {
            conversionId: currentChatId,
            senderId: currentUser._id,
            text: chatText.current.value
        }

        setUserChats((prev)=>[...prev,newChat ])

        const sendChat = async () => {
            await axios.post('/api/chat/', newChat);
        }
        sendChat();
        const receiverId = userConverstion.find((c)=>c._id===currentChatId)?.members?.find(
            (member) => member !== user._id
          );

      
          socket.current?.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: chatText.current?.value,
          });

          chatText.current.value = "";

    }

    

    const handleClick=async(id)=>{
        const newConversation={
            senderId:user._id,
            recieverId:id
        }
        await axios.post('/api/conversion/',newConversation);
    }


    const selectMemeberOfConverstion = userConverstion?.map((item) => item.members[0] !== currentUser._id ? item.members[0] : item.members[1]);

    const startConverstion = user?.following?.filter((id) => !selectMemeberOfConverstion.includes(id));



    return (
        <>

            <div className="m-0 p-0 relative">

                <div className="w-full mb-14 ">
                    <Navbar />
                </div>

                <div className="w-full flex">
                    <div className="w-3/12">
                        <div className="mt-3 mb-5 pl-4 w-[80%]">
                            <TextField fullWidth variant='standard' label="Search For a friend" />
                        </div>

                        {userConverstion.map((item) => {

                            return <div key={item._id} onClick={() => setcurrentChatId(item._id)} className="mb-5 pl-4 h-20 flex items-start cursor-pointer hover:bg-[#eae7e7]">
                                <Friend chat userid={item.members[0] !== currentUser._id ? item.members[0] : item.members[1]} />
                            </div>

                        })}

                        <h3 className='pl-3'>Start a Converstion</h3>

                        {startConverstion?.map((id, index) => {
                            return <div key={id} onClick={() => handleClick(id)} className="mb-5 pl-4 h-20 flex items-start cursor-pointer hover:bg-[#eae7e7]">
                                <Friend chat userid={id} />
                            </div>
                        })}

                    </div>
                    {currentChatId ? <div className="w-5/12">

                        <div ref={scrollBar} className="my-3 overflow-y-scroll h-screen">
                            {userChats.map((item) => {
                                return <Converstion own={item.senderId === currentUser._id} key={item._id} item={item} />
                            })}
                        </div>
                        <form type='submit' onSubmit={handleChatSubmit} className="flex items-center justify-between">
                            <textarea ref={chatText} rows={5} cols={50} placeholder='Write something ....' className='border pl-1 rounded' />
                            <div className="">
                                <Button type='submit' variant='contained' color='success'>Send</Button>
                            </div>
                        </form>
                    </div> : <NoCurrentChat />}
                    <div className="w-4/12">
                        {onlineFriend?.map((item) => {
                            return <Friend key={item} Rightbar />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
