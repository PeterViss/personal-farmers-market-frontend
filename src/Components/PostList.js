import React from 'react'
 const PostList = (props) => {
    return(
        <div>
            <ul>
            {props.posts.map(post => {
               return <div key={post.id}><li>{new Date(post.startTime).toDateString()} </li>
                      <button onClick={() => props.clickHandler(post)}>edit</button></div>
            })}
            </ul>
        </div>
    )
}
export default PostList