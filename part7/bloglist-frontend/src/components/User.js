import { Typography } from '@material-ui/core'
import React from 'react'
import BlogCard from './BlogCard'

function User({ user } ){
  if(!user) return null

  return (
    <div>
      <Typography variant="h2" component="h2" gutterBottom>
        {`${user.name}'s blogs`}
      </Typography>
      {user.blogs.map(blog =>
        <BlogCard blog={blog} key={blog.id}/>
      )}
    </div>
  )
}

export default User
