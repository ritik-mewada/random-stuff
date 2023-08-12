// install react-toastify package
// import n call ToastContainer in app.js
// import { ToastContainer } from 'react-toastify';
// <ToastContainer /> above <App />

// You Can Add Custom Css
// .custom-toast {
//   margin: 20px 0;
//   padding: 12px;
//   width: 80%;
//   float: right;
//   white-space: pre-line;
// }

import { toast } from "react-toastify"
import './CustomNotification.css';

const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  pauseOnFocusLoss: false,
  theme: "light",
  className: "custom-toast"
}

export const showNotification = (type, message) => {
  if (type === 'success') {
    toast.success(message, toastConfig);
  } else if (type === 'error') {
    toast.error(message, toastConfig)
  }
};

// how to use 
showNotification('error', "Something Went Wrong");
showNotification('success', "Successfully Done");