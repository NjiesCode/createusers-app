import React from 'react'
import UsePost from '../hooks/use-post'
const Post = () => {
    const {data , isLoading}=UsePost(1)
  return (
    <div>
        {isLoading ? <h1>content is Loading</h1>:JSON.stringify(data) }
        </div>
  )
}

export default Post