import React from 'react'
import './SignUp.css'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from '../../redux/userSlice'
import Loading from '../loading/Loading'

const SignUp = () => {


  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {loading, error, isLoggedIn} = useSelector((state) => state.users);



  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [resume, setResume] = useState("")

  const nameChangeHandler = (e) => {
    setName(e.target.value)
  }

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }
  
  const resumeChangeHandler = (e) => {
    console.log(e.target.files[0])
    setResume(e.target.files[0])
  }

  
//  const ifInTempStorage = () =>  {
//   const inTempStorage = useSelector((state) => state.users.inTempStorage)
//   return inTempStorage;
//  }

console.log(error)


useEffect(() => {
  if(isLoggedIn){
    navigate('/')
  }
},[])


const onSubmitHanlder = async(e) => {
    // e.preventDefault();
    console.log(name, email, password);
    await dispatch(registerUserAction({name, email, password, file:resume}))
}

  


  
  return (
    <div className='sign-up-page'>
       {
              error ? (window.alert(error.messsage)):""
      }{
        error ? window.location.href="":""
}
        <img className='sign-up-page-img' src="" alt="" />

        <div className='sign-up-main' >
      
            <div className='sign-up-main-left'>
                <p className='sign-up-left-welcome'>YourHR</p>
                <p className='sign-up-left-para'>Where talent meets oppurtunities... </p>
            </div>

            <div className='sign-up-main-right' >
                <p className='sign-up-right-signin'>Sign up</p>
                
                <div className='sign-up-right-input-parent-div'>

                        <p className='sign-up-page-input-fields-desc'>Name</p>
                        <input onChange={nameChangeHandler}  required className='sign-up-page-input-fields' type="text" />

                        <p className='sign-up-page-input-fields-desc'>Email</p>
                        <input  onChange={emailChangeHandler} required className='sign-up-page-input-fields' type="text" />
                    
                        <p className='sign-up-page-input-fields-desc'>Password</p>
                        <input  onChange={passwordChangeHandler} required minLength={6} className='sign-up-page-input-fields' type="password" />

                        <p className='sign-up-page-input-fields-desc'>Your Resume</p>
                        <input  onChange={resumeChangeHandler} required  className=' fileupload' type="file" />
                        
                       

                   <div className='sign-up-page-submit-btn-div'>
                   {
                   loading ? <Loading /> :<button onClick={onSubmitHanlder} className='sign-up-button'>Submit</button>
                   }
                   </div>
                </div>

               <div  className='sign-up-page-link-div'>
                <Link className='sign-up-page-link' to='/signin'>Already have account? Sign in.</Link>

               </div>

            </div>

        </div>

    </div>
  )
}

export default SignUp