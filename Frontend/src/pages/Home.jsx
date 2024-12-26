import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAdmin } from '../features/Auth/AuthSlice';

const Home = () => {
  const {token,pending,error} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();


  return (
    <div>
        <p>
            Testing home page workings . 
            <button className='bg-red-500 p-3 font-bold m-4 rounded-lg px-5 hover:bg-red-700' onClick={()=>dispatch(logoutAdmin())}>Logout</button>
        </p>
    </div>
  )
}

export default Home