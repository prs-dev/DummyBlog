import { State } from "../../context/Context";
import { getAllArticles, setLoading, category } from "../../context/reducer";
import "./home.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditPost from '../../components/editpost/EditPost'
import { toast, ToastContainer } from 'react-toastify';

const Home = () => {
  const { state, dispatch } = State();
  const [res, setRes] = useState("")
  const [commentFormOpen, setCommentFormOpen] = useState(false)
  const [editForm, setEditForm] = useState(false)
  const [active, setActive] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const [filter, setFilter] = useState("")
  const [comment, setComment] = useState('')
  const token = localStorage.getItem("token");

  const url = "http://localhost:4000/api/articles"

  const addComment = (id) => {
    return async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post(`${url}/comment/${id}`, { comment }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        })
        console.log(res)
        setCommentFormOpen(!commentFormOpen)
        toast.success(res?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
  }

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`${url}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(res)
      setRes(res)
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      // dispatch(setLoading(false))
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  useEffect(() => {
    const temp = async () => {
      dispatch(setLoading(true))
      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        // console.log(res)
        dispatch(getAllArticles(res.data.articles));
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } finally {
        dispatch(setLoading(false))
      }
    };
    temp();
  }, []);

  useEffect(() => {
    const temp = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        // console.log(res)
        dispatch(getAllArticles(res.data.articles));
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    };
    temp();
  }, [commentFormOpen, res]);


  // console.log(state);
  // console.log(commentFormOpen)
  // console.log(active)
  // console.log(filter)
  return (
    <div className="home">
      <ToastContainer />
      <Link to="/addpost" style={{
        color: "#333",
        cursor: "pointer"
      }}>
        <div className="add-post">
          <i class="fa-solid fa-plus"></i>
        </div>
      </Link>
      <section className="filter">
        <label htmlFor="art">Art</label>
        <input type="radio" name="cat" value="art" onClick={e => {
          setFilter(e.target.value)
          dispatch(category(e.target.value))
        }} />
        <label htmlFor="music">Music</label>
        <input type="radio" name="cat" value="music" onClick={e => {
          setFilter(e.target.value)
          dispatch(category(e.target.value))
        }} />
        <label htmlFor="tech">Tech</label>
        <input type="radio" name="cat" value="tech" onClick={e => {
          setFilter(e.target.value)
          dispatch(category(e.target.value))
        }} />
      </section>
      {state.loading ? (
        <div className="loader"></div>
      ) : (
        !state?.filtered ? 
        state?.articles?.map((article) => (
          <>
            <div className="article">
              <section className="article-top">
                <div className="article-title">
                  <h1>{article.title}</h1>
                </div>
                <div className="article-content">
                  <p>{article.content}</p>
                </div>
              </section>
              <section className="article-bottom">
                <div className="article-btns">
                  <button className="add-comment" onClick={() => {
                    setCommentFormOpen((prev) => !prev)
                    setActive(article._id)
                  }}>
                    <i class="fa-solid fa-comment-medical"></i>
                  </button>
                  <button className="edit" onClick={() => {
                    setEditForm(!editForm)
                    setActive(article._id)
                  }}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="delete" onClick={() => deletePost(article._id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
                <div className="article-stats">
                  <div className="user">
                    <i class="fa-solid fa-user"></i>
                    <span>{article?.user?.username}</span>
                  </div>
                  <div className="categories">
                    <i class="fa-solid fa-tag"></i>
                    {article?.cat.map(item => (
                      <span>{item} </span>
                    ))}
                    {/* <span>art </span>
                  <span>music </span> */}
                  </div>
                  <div className="comments-count" style={{cursor: "pointer"}} onClick={() => {
                    setShowComments(!showComments)
                    setActive(article._id)
                  }}>
                    <i class="fa-solid fa-comment"></i>
                    <span>{article.comments.length}</span>
                  </div>
                </div>
              </section>
              {showComments &&
                <section className={active === article._id ? "comment-list active" : "comment-list"}>
                  <ul>
                    {article.comments.map(item => (
                      <li>{item.comment}</li>
                    ))}
                  </ul>
                </section>}
              {commentFormOpen &&
                <div className={active === article._id ? "comment-form active" : "comment-form"}>
                  <form onSubmit={addComment(article._id)}>
                    <textarea cols="30" rows="2" onChange={e => setComment(e.target.value)}></textarea>
                    <button type="submit">add comment</button>
                  </form>
                </div>
              }
              {editForm && <EditPost id={article._id} setRes={setRes} setEditForm={setEditForm} className={active === article._id ? "edit-post active" : "edit-post"} />}
            </div>
          </>
        )) : state?.filtered?.map(article => (
          <>
            <div className="article">
              <section className="article-top">
                <div className="article-title">
                  <h1>{article.title}</h1>
                </div>
                <div className="article-content">
                  <p>{article.content}</p>
                </div>
              </section>
              <section className="article-bottom">
                <div className="article-btns">
                  <button className="add-comment" onClick={() => {
                    setCommentFormOpen((prev) => !prev)
                    setActive(article._id)
                  }}>
                    <i class="fa-solid fa-comment-medical"></i>
                  </button>
                  <button className="edit" onClick={() => {
                    setEditForm(!editForm)
                    setActive(article._id)
                  }}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="delete" onClick={() => deletePost(article._id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
                <div className="article-stats">
                  <div className="user">
                    <i class="fa-solid fa-user"></i>
                    <span>{article?.user?.username}</span>
                  </div>
                  <div className="categories">
                    <i class="fa-solid fa-tag"></i>
                    {article?.cat.map(item => (
                      <span>{item} </span>
                    ))}
                    {/* <span>art </span>
                  <span>music </span> */}
                  </div>
                  <div className="comments-count" style={{cursor: "pointer"}} onClick={() => {
                    setShowComments(!showComments)
                    setActive(article._id)
                  }}>
                    <i class="fa-solid fa-comment"></i>
                    <span>{article.comments.length}</span>
                  </div>
                </div>
              </section>
              {showComments &&
                <section className={active === article._id ? "comment-list active" : "comment-list"}>
                  <ul>
                    {article.comments.map(item => (
                      <li>{item.comment}</li>
                    ))}
                  </ul>
                </section>}
              {commentFormOpen &&
                <div className={active === article._id ? "comment-form active" : "comment-form"}>
                  <form onSubmit={addComment(article._id)}>
                    <textarea cols="30" rows="2" onChange={e => setComment(e.target.value)}></textarea>
                    <button type="submit">add comment</button>
                  </form>
                </div>
              }
              {editForm && <EditPost id={article._id} setRes={setRes} setEditForm={setEditForm} className={active === article._id ? "edit-post active" : "edit-post"} />}
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default Home;
