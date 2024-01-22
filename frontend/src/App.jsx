import './App.css'

// import { useContext } from "react";
// import { authContext } from "./context/authContext";

import Layout from './layout/Layout'

function App() {
  
  // const { dispatch } = useContext(authContext);
  // const token = localStorage.getItem('token')

  // if (token.exp * 1000 < Date.now()) {
  //   dispatch('LOGOUT')
  // }

  return (
    <Layout />
  )
}

export default App
