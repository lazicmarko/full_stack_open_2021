import React from 'react'
import { Button, Card, CardActions,  CardHeader, Typography, makeStyles } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    marginTop: 5,
    marginBottom: 5,
  }
})

function BlogCard({ blog }) {
  const classes = useStyles()

  return (
    <div>
      <Card key={blog.id} className={classes.card} elevation={3}>
        <CardHeader
          title={blog.title}
          subheader={`Author: ${blog.author}`}
        />
        <CardActions>
          <Button component={RouterLink} to={`/blogs/${blog.id}`} size="small" color="primary">
            Show more
          </Button>
          <Typography color='textSecondary'>
            {blog.likes} likes
          </Typography>
          <Typography color='textSecondary'>
            {blog.comments.length} comments
          </Typography>
        </CardActions>
      </Card>
    </div>
  )
}

export default BlogCard
