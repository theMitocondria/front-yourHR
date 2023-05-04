import React, { useEffect } from 'react'
import './SignIn.css'
import '../SignUp/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from '../../redux/userSlice'
import Loading from '../loading/Loading'


const SignIn = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loading, error, isLoggedIn } = useSelector((state) => state.users);
    useEffect(()=>{
        
        if(isLoggedIn){
            console.log("yes di");
            navigate('/')
        }
    })


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    // const userInfo = useSelector((state) => state.users?.userAuth?.userInfo)

    

    const onSubmitHanlder = async (e) => {
        e.preventDefault();
        console.log(email, password);
        dispatch(signInAction({ email, password }))
        


    }




    return (

        <div className='sign-in-page'>
            {
                error ? (window.alert(JSON.stringify(error.messsage))) : ""
            }{
                error? (window.location.href="/signin"):""
            }
            <img className='sign-in-page-img' src="" alt="" />

            <div className='sign-in-main' >


                <div className='sign-in-main-left'>
                    <p className='sign-in-left-welcome'>YourHR</p>
                    <p className='sign-in-left-para'>Missed you a lot. hoping for a better session with you this time. Stay Consistent, achieve your goal.</p>
                </div>

                <div className='sign-up-main-right' >
                    <p className='sign-up-right-signin'>Sign in</p>

                    <form className='sign-up-right-input-parent-div'>



                        <p className='sign-up-page-input-fields-desc'>Email</p>
                        <input onChange={emailChangeHandler} required className='sign-up-page-input-fields'/>



                        <p className='sign-up-page-input-fields-desc'>Password</p>
                        <input onChange={passwordChangeHandler} required className='sign-up-page-input-fields' type="password" />


                        <div className='sign-up-page-submit-btn-div'>
                            {
                                loading?<Loading/>:<button onClick={onSubmitHanlder} className='sign-up-button'>Submit</button>
                            }

                        </div>
                    </form>

                    <div className='sign-in-page-link-div'>
                        <Link className='sign-up-page-link' to='/'>New User? Create an Account.</Link>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default SignIn