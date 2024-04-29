import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import 'react-toastify/dist/ReactToastify.css'
// import { ToastContainer, toast } from 'react-toastify'
// toast.configure({
//   autoClose: 2000,
//   draggable: false,
//   position: toast.POSITION.TOP_CENTER
// })
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
