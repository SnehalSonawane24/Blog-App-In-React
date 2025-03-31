import { useEffect, useState, useRef, useReducer, act } from "react";
import "./index.css"
import { db } from "./firebaseinit"

import { collection, addDoc, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore";

function App() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [formData, setFormData] = useState({ "title": "", "content": "" })
  const [blogs, setBlogs] = useState([])
  const titleRef = useRef(null);
  // const [blogs, dispatch] = useReducer(blogReducer, [])

  useEffect(() => {
    titleRef.current.focus();
  }, [])

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title
    }
    else {
      document.title = "There is no blogs yet!"
    }
  }, [blogs])

  useEffect(() => {
    // async function fetchData(){
    //   const querySnapshot = await getDocs(collection(db, "blogs"))
    //   querySnapshot.forEach((doc)=>{
    //     const blogs = querySnapshot.docs.map((doc)=>{
    //       return{
    //         id : doc.id,
    //         ...doc.data()

    //       }
    //     })
    //     setBlogs(blogs)
    //   })
    // }
    // fetchData()

    const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()

        }
      })
      setBlogs(blogs)
    })
  }, []);


  function blogReducer(state, action) {
    switch (action.type) {
      case "ADD":
        return [action.blog, ...state]

      case "REMOVE":
        return state.filter((blog, index) => index !== action.index)

      default:
        return []

    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // setBlogs([{title:formData.title,content: formData.content},...blogs]) 
    // dispatch({type:"ADD", blog: {title:formData.title,content: formData.content}})
    setFormData({ title: "", content: "" })
    titleRef.current.focus();

    const docRef = await addDoc(collection(db, "blogs"), {
      title: formData.title,
      content: formData.content,
      createdOn: new Date()
    });


    // console.log(blogs)
  }

  async function removeBlog(id) {
    // setBlogs(blogs.filter((blog,index)=>(i!==index)))
    // dispatch({type:"REMOVE", index: i})

    const docRef = doc(db, "blogs", id);
    await deleteDoc(docRef)
  }

  return (
    <div className="container">
      <h1>Write a Blog</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label> <br />
        <input type="text" placeholder="Enter Title here..." value={formData.title}
          ref={titleRef}
          required
          onChange={(e) => setFormData({ title: e.target.value, content: formData.content })}
        ></input>
        <br /><br />
        <label>Content</label> <br />
        <input type="text" placeholder="Content goes here" value={formData.content}
          onChange={(e) => setFormData({ content: e.target.value, title: formData.title })}
        ></input>
        <br /><br />
        <button>Add</button>
      </form>
      <hr />
      <h2>Blog</h2>
      <div className="blog-list">

        {
          blogs.map((blogs, i) => (
            <div className="blog-card" key={i}>
              <h4>{blogs.title}</h4>
              <p>{blogs.content}</p>
              <button onClick={() => removeBlog(blogs.id)}>Delete</button>
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default App;
