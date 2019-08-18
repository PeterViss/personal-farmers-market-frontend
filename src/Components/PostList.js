import React from 'react'
 const PostList = (props) => {

    return( 
        <div>
            <ul>
            {props.posts ? 
            props.posts.map(post => {
               return <div key={post.id}>
                   <li key={post.id}> 
                       Title: {post.title}
                       <br></br>
                       Date: {new Date(post.startTime).toDateString()} 
                   </li> 
                      <button onClick={() => props.clickHandler(post)}>{props.show}</button>
                      {props.pick ? <button onClick={() => props.changeDisplay(post)}>{props.pick}</button>
                      : null
                    }
                    </div>
            })
        : "No Posts To See Here"
        }
            </ul>
        </div>
    )
}
export default PostList