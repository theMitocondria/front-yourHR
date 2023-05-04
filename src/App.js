import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.users?.isLoggedIn)
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/signin' element= {
          <SignIn />
        } /> 
       
        
       
         <Route path='/' element= {
         !isLoggedIn ? <SignUp /> : <Home />
        } /> 
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
