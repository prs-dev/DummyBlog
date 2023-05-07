import './login.css'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [res, setRes] = useState("")
    const navigate = useNavigate()

    const url = "http://localhost:4000/api/users/login"

    const handleSubmit = async(e) => {
        e.preventDefault()
        const user = { email, password }
        try {
            const res = await axios.post(url, user)
            console.log(res.data)
            localStorage.setItem("token", res.data?.token)
            // navigate("/")
            setRes(res)
            toast.success(res?.data?.message)
            window.location.reload()
        } catch (error) {
            console.log(error.message)
            toast.error(error?.response?.data?.message)
        }
        e.target.reset()
    }

    return (
        <div className="login">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="login-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="login-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" onChange={e => setPassword(e.target.value)}/>
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login