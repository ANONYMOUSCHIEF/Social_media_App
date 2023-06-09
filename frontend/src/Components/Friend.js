import { Avatar, Badge } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
export default function Friend({ Rightbar,chat,userid }) {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    const fetchUser = async () => {
      const res = userid && await axios.get(`/api/users/${userid}`);
      setCurrentUser(res?.data);
    };
    fetchUser();
  }, [userid]);
  const Online = () => (<>
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar alt="avatar" src={PF + "/assests/noavtar.png"} />
    </StyledBadge>
  </>)
  const Offline = () => (<>
  { chat ? <Avatar style={{ paddingLeft: '2px' }} alt='avatar' src={PF + "/assests/noavtar.png"} />
   : <Link to={`/profile/${currentUser?._id}`}>
      <Avatar style={{ paddingLeft: '2px' }} alt='avatar' src={PF + "/assests/noavtar.png"} />
    </Link> 
  }
  </>)
  return (
    <ul>
      <li className='flex items-center mt-4'>
        {Rightbar ? <Online /> : <Offline />}
        <span className=' pl-2 font-bold'>{Rightbar ? 'Elizbeth' : currentUser?.username} </span>
      </li>
    </ul>
  )
}
