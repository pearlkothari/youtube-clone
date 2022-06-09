import React from 'react'
import {FaBars} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"
import {MdNotifications,MdApps} from "react-icons/md"
import './Header.scss'
import {YoutubeLogo} from '../../icons/AccessFile';
import Login from '../Screens/Login/Login'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


function Header({switchSidebar}) {
  const accessToken=useSelector(state=>state.auth.accessToken);
  const profile=useSelector(state=>state.auth.user?.picture);

  useEffect(()=>{
  },[accessToken,profile])
  return (
    <div className='header border border-dark'>
      {console.log(accessToken)}
      <FaBars className='Header-Bar'size={18} onClick={switchSidebar}></FaBars>
      <img 
        src={YoutubeLogo} 
        alt="YouTube" 
        className="youtube_logo" 
      />

      <form>
        <input type="text" placeholder='Search' />
        <button type='submit'>
            <AiOutlineSearch size={22}/>
        </button>
      </form>

      <div className="_icons">
        <MdNotifications size={22}/>
        <MdApps size={22}/>
        {accessToken==null && <Login></Login>}
        {accessToken!=null && <img src={profile} alt="avatar" className="avatar" />}
      </div>
    </div>
  )
}

export default Header