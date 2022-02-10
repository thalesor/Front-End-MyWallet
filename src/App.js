import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from "./contexts/UserContext";
import { AppContainer } from './Share/Components';
import SignUp from './components/SignUp/Index';
import SignIn from './components/SignIn/Index';
import Home from './components/Home/Index';
import Entrada from './components/Entrada/Index';
import Saida from './components/Saida/Index';
import { deleteSession } from './services/axios-service';

function App() {
  
  const [userData, setUserData] = useState(localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null);
  const [isVisibleMessage, setIsVisibleMessage] = useState(false);
  const initialMessageState = 
  {
    showCancel : false,
    message: '',
    type: 'error',
    confirmBtnText: '',
    cancelBtnText: '',
    fn: null,
    messageTitle: ''
  };
  const [messageData, setMessageData] = useState(initialMessageState);

  const message = (message, type='success', title=title, fn=null) =>
  {
    const messageConfig = 
    {
        message: message,
        type: type,
        confirmBtnText: 'OK',
        title: title,
        fn: fn
    };
    displayMessage(messageConfig);
}


  const displayMessage = (messageConfig) =>
  {
    setMessageData(messageConfig);
    setIsVisibleMessage(true);
  }

  const hideMessage = () => 
  {
    setIsVisibleMessage(false);
    setMessageData(initialMessageState);
  }

  const formatMoney = (value) =>
    {
        value += '';
            value = parseInt(value.replace(/[\D]+/g, ''));
            value = value + '';
            value = value.replace(/([0-9]{2})$/g, ",$1");

            if (value.length > 6) {
                value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }

            if(value == 'NaN') 
            return '';
            return value;
    };

  async function logout(token)
  {
    try {
      await deleteSession(token);
      localStorage.clear();
      setUserData(null);
      window.location.replace("/");
    }
    catch(err)
    {
      message(err.response.data, 'error', 'Erro ao logar!');
    }
  }

  return (
    <AppContainer>
      <UserContext.Provider value={{userData, setUserData, hideMessage, displayMessage, logout, formatMoney, message}}>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={
      <SignIn />
      }></Route> 
      <Route path="/cadastro" element={   
        <SignUp />
      }></Route> 
      <Route path="/home" element={
        <Home />
      }></Route> 
      <Route path="/entrada" element={
        <Entrada />
      }></Route>
      <Route path="/saida" element={
        <Saida />
      }></Route> 
      </Routes>
      { isVisibleMessage && 
        <SweetAlert
            type={messageData.type}
            showCancel={messageData.showCancel}
            confirmBtnText= {messageData.confirmBtnText ? messageData.confirmBtnText : "Ok"}
            cancelBtnText= {messageData.cancelBtnText}
            title={messageData.title}
            onConfirm={()=> {
              if(messageData.fn)
              messageData.fn()
              else
              hideMessage();
            }}
            onCancel={()=> hideMessage()}
            >
            {messageData.message}
        </SweetAlert>
        }
    </BrowserRouter>
    </UserContext.Provider>
    </AppContainer>
  );
}


export default App;
