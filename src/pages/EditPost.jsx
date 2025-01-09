import React, { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import appwriteService from "../appwrite/config"
import PostForm from '../components/post-form/PostForm'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const navigate=useNavigate();
    const {slug}=useParams();
    const [post,setPosts]=useState(null);

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug)
            .then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate("/"); 
        }
    },[slug,navigate])

  return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost
