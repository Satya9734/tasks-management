
import { createRoot } from 'react-dom/client'
import './Main.css'

import App from './App.jsx'
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import Alltask from './components/pages/Alltask.jsx'
import Add from './components/pages/Add.jsx'
import User from './components/pages/User.jsx'
import Login from './components/pages/user/Login.jsx'
import Signin from './components/pages/user/Signin.jsx'
import Logout from './components/pages/user/Logout.jsx'
import "react-toastify/ReactToastify.css"
import {Provider} from "react-redux"
import store from "./redux/store.js"
import Complete from './components/pages/Complete.jsx'
import Pending from './components/pages/Pending.jsx'
import Note from './components/pages/Note.jsx'
import SaveNote from './components/pages/notes/saveNote.jsx'
import EditNote from './components/pages/notes/editNote.jsx'
import ShowNotes from './components/pages/notes/showNotes.jsx'
const routs=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"dashbord",
        element:<><Add/><Alltask/></>
      },
      {
        path:"complete",
        element:<Complete/>
      },
      {
        path:"pending",
        element:<Pending/>
      },
      {
        path:"user",
        element:<User/>,
        children:[
          {
            path:"",
            element: <Navigate to="login" />
          },
          {
            path:"login",
            element:<Login/>
          },
          {
            path:"signin",
            element:<Signin/>
          },
          {
            path:"logout",
            element:<Logout/>
          },
        ]
      },
      {
        path:"note",
        element:<Note/>,
        children:[
          {
            path:"",
            element:<Navigate to="show"/>
          },
          {
            path:"save",
            element:<SaveNote/>
          },
          {
            path:"edit/:id",
            element:<EditNote/>
          },
          {
            path:"show",
            element:<ShowNotes/>
          },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
   <RouterProvider router={routs}/>
 </Provider>

)
