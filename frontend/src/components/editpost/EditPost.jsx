import { useEffect, useState } from 'react'
import './editpost.css'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'

const EditPost = ({id, setRes, setEditForm, active, className}) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const token = localStorage.getItem("token")

  const url = "http://localhost:4000/api/articles"

  useEffect(() => {
    const temp = async() => {
      try {
        const res = await axios.get(`${url}/${id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        // console.log(res.data.result)
        setTitle(res.data.result.title)
        setContent(res.data.result.content)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }
    temp()
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault()
    const updatedArticle = {
      title,
      content
    }
    try {
      const res = await axios.put(`${url}/${id}`, updatedArticle, {
          headers: {
            Authorization: "Bearer " + token
          }
      })
      console.log(res)
      setRes(res)
      setEditForm(prev => !prev)
      toast.success(res?.data?.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
    // console.log(title, content)

  }

  return (
    <div className={className}>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
          <label htmlFor="content">Content</label>
          <textarea name="content" cols="30" rows="10" value={content} onChange={e => setContent(e.target.value)}/>
          <button type='submit'>Save Edited Post</button>
        </form>
    </div>
  )
}

export default EditPost