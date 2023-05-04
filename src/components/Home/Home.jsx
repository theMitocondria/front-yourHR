import React from 'react'
import './Home.css'
import { useSelector } from 'react-redux'
import { saveAs } from 'file-saver';

const Home = () => {
   
    const {user} = useSelector((state) => state.users);
    const logoutHandler = () => {
        window.location.href='/'
    }
    const downloadImage = () => {
        saveAs(user.emailFound.resume, 'resume.pdf')
    }
  return (
    <div className='home'>
        <button className='button-home'>
            <img src="https://th.bing.com/th/id/OIP.sUwAcbbjGtQJOkoDDsT8rgHaQf?pid=ImgDet&rs=1" className="img-home"/>
            <h1 className='name-home'>{user?.emailFound?.name}</h1>
            <h2 className='name-home'>{user?.emailFound?.email}</h2>
            <a  className='logout' href={user?.emailFound?.resume} to="_blank"  >Show Resume</a>
            <button  onClick={logoutHandler} className='logout'>Logout</button>
        </button>
    </div>
  )
}

export default Home