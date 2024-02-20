import React, { useEffect, useState } from 'react'
import axios from'axios';
import { setUser } from '../feature/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import Creditdebit from './Creditdebit';
import Data from './Data';
function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.username);
  useEffect(()=>{
      const item = localStorage.getItem('authToken');
      axios.post('/userdatail',{},{
        //pass token header through
        headers:{
          "authtoken":item
        }
      }).then((res)=>{
        const userData = res.data;
        // console.log("user data",userData)
        dispatch(setUser(userData));
      })
      .catch((err)=>console.log(err))
  },[])
  return (
    <>
      <p>{user.email}</p>
    <div className='d-flex'>
      <Creditdebit/>
      <Data/>
    </div>
    </>
  )
}

export default Home
