import React, { useEffect, useState } from 'react'
import { Container, PostCard, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import authService from '../appwrite/auth'

function EditPost() {
    const [posts, setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                  setPosts(post)
                }
            })
        }else{
          navigate('/')
        }
    }, [slug, navigate])
  return posts ? (
    <div className='py-8'>
      <PostForm post={posts}/>
    </div>
  ) : null
}

export default EditPost
