import "./navbar.css"
import { Link } from "react-router-dom"

const token = localStorage.getItem("token")

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="link">
        <div className="logo">
          <h1>Pratyush Blog</h1>
        </div>
      </Link>
      <div className="links">
        {!token && <Link to="/register" className="link">Register</Link>}
        {!token && <Link to="/login" className="link">Login</Link>}
        {token && <a href="#" className="link" onClick={() => {
          localStorage.removeItem("token")
          window.location.reload()
        }}>Logout</a>}
        <Link to="/about" className="link">About</Link>
      </div>
    </div>
  )
}

export default Navbar