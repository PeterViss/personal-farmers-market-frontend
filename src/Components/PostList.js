import React from 'react'

 const PostList = (props) => {
    return(
        <div>
            <ul>
            {props.posts.map(post => {
               return <li key={post.id} onClick={() => props.clickHandler(post)}>{new Date(post.startTime).toDateString()}</li>
            })}
            </ul>
        </div>
    )
}
export default PostList