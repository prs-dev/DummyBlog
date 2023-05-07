import './register.css'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const url = "http://localhost:4000/api/users/register"

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { username, email, password }
        try {
            const res = await axios.post(url, user)
            console.log(res)
            toast.success(res?.data?.message, {
                
            })
            navigate("/login")
        } catch (error) {
            console.log(error.message)
            toast.error(error?.response?.data?.message)
        }
        
        e.target.reset()
    }
    return (
        <div className="register">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="register-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="register-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="register-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Register