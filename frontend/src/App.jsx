import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from "./components/navbar/Navbar"
import Home from './pages/home/Home'
import Single from './pages/single/Single'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import About from './components/About'
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const token = localStorage.getItem("token")
  return (
    <div className="app">
      <Router>
        <Navbar />
        <main>
        <Routes>
          <Route path='/' element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path='/addpost' exact element={token ? <Single /> : <Navigate to="/login" />} />
          <Route path="/login" exact element={!token ? <Login /> : <Navigate to="/" />}/>
          <Route path="/register" exact element={!token ? <Register /> : <Navigate to="/" />}/>
          <Route path='/about' element={<About />} />
        </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App