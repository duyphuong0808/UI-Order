import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import localStorageCustom from './app/localStorageCustom';
import HomePage from './features/homePage/pages/HomePage';
import FormUpdateOrder from './features/homePage/pages/UpdatePage';
import CheckEmailPage from './features/login/pages/Login/CheckEmailPage';
import RegisterPage from "./features/login/pages/Login/RegisterPage";

function App() {

  const checkExpiredToken = () => {
    const accessToken = localStorageCustom.getAccessToken();

    if (!accessToken) {
      return true;
    } else {
      return false;
      // var dateNow = new Date();
      // if (accessToken.expires_in > dateNow) {
      //   console.log("Compare date: ", true);
      //   // TODO: refresh token
      // } else {
      //   console.log("Compare date: ", false);
      // }
    }

  }

  return (
    <div className='web-order-app'>
      <Routes>
        <Route path="" element={<CheckEmailPage />} />
        <Route path="/login" element={<CheckEmailPage />} />
        <Route path="/home-page" element={checkExpiredToken() ? <Navigate to='/login' /> : <HomePage />} />
        <Route path='/login/:email' element={<Login />} />
        <Route path='/register/:email' element={<RegisterPage />} />
        <Route path='/update' element={checkExpiredToken() ? <Navigate to='/login' /> : <FormUpdateOrder />} />
      </Routes>
    </div>

  );
}

function Login() {
  window.location.replace('http://localhost:9000/oauth/authorize?client_id=clientapp&response_type=code&redirect_uri=http://localhost:3000/&scope=read');
  return null;
}
export default App;
