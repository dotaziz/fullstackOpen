import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  if(false){
    return <Blog/>
  }else{
    return <Login/>
  }
}

export default App
