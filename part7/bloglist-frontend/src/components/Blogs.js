import React from 'react'
import { useSelector } from 'react-redux'
import BlogCard from './BlogCard'

function Blogs() {
  const blogs = useSelector(state => state.blogs)

  return (
    <div id='bloglist'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <BlogCard blog={blog} key={blog.id}/>
        )}
    </div>
  )
}

export default Blogs
