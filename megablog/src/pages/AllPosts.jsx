import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [post, setPost] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPost(posts.documents)
            }
        })
    }, [])

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {post.map((p) => (
                    <div key={p.$id} className='p-2 w-1/4'>
                        <PostCard post={p}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
