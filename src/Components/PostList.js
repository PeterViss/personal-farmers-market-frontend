import React from 'react'
import { Card, Button } from 'semantic-ui-react'
const PostList = props => {
  let sortedPosts = props.posts.sort(function(a, b) {
    return a.id - b.id
  })
  return (
    <div>
      <Card.Group>
        {props.posts
          ? sortedPosts.map(post => {
              return (
                <Card key={post.id} fluid>
                  <Card.Content>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Meta>
                      {new Date(post.startTime).toDateString()}
                    </Card.Meta>
                  </Card.Content>

                  <Card.Content extra>
                    <Button onClick={() => props.clickHandler(post)} color="vk">
                      {props.show}
                    </Button>
                    {props.pick ? (
                      <Button
                        onClick={() => props.changeDisplay(post)}
                        color="yellow"
                      >
                        {props.pick}
                      </Button>
                    ) : null}
                  </Card.Content>
                </Card>
              )
            })
          : 'No Posts To See Here'}
      </Card.Group>
    </div>
  )
}
export default PostList
