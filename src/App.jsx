import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from './contexts/User';
import './App.css'
import { Header } from './Components/Header'
import { SingleChat } from './pages/SingleChat';
import { Home } from './pages/Home'


const username = prompt('What is your name?');

function App() {
  const { user, setUser } = useContext(UserContext)
  useEffect(() => {
    setUser(username)
  }, [])  



  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chats/:chatid" element={<SingleChat />} />
      </Routes>
    </div>
  )
}

export default App
