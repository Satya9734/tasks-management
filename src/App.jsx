import {Outlet} from "react-router-dom"
import Nav from './components/base/Nav'
import Foot from './components/base/Foot'
function App() {

  return (
    <>
    <Nav/>
    <div className="outlet-container">
        <Outlet />
      </div>
    <Foot/>
    </>
  )
}

export default App
