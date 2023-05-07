import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './single.css'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'

const Single = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [cat, setCat] = useState([])
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const url = "http://localhost:4000/api/articles/create"

  // console.log(cat)
  // console.log()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const obj = {
        title,
        content,
        cat: Array.from(new Set(cat))
      }
      const res = await axios.post(url, obj, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      })
      console.log(res)
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className="single">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
        </section>
        <section>
          <label htmlFor="content">Content</label>
          <textarea name="content" cols="30" rows="10" onChange={e => setContent(e.target.value)}></textarea>
        </section>
        <section>
          <label htmlFor="categories">Categories</label>
          <section className='single-categories'>
            <label htmlFor="cat">Art</label>
            <input type="checkbox" name="cat" value="art" onChange={e => setCat([...cat, e.target.value])} />
            <label htmlFor="music">Music</label>
            <input type="checkbox" name="music" value="music" onChange={e => setCat([e.target.value, ...cat])} />
            <label htmlFor="tech">Tech</label>
            <input type="checkbox" name="tech" value="tech" onChange={e => setCat([e.target.value, ...cat])} />
          </section>
        </section>
        <button type='submit'>Add Post</button>
      </form>
    </div>
  )
}

export default Single