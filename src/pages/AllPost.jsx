import React, { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import PostCard from "../components/PostCard"
import appwriteService from "../appwrite/config"

function AllPost() {
    const [posts,setPosts]=useState([])

    const [currentPage,setCurrentPage]=useState(1);
    const[cardsPerPage,setCardsPerPage]=useState(4);
    const indexOfLastItem=currentPage * cardsPerPage;
    const indexOfFirstItemn=indexOfLastItem-cardsPerPage;

    const currentItems=posts?.slice(indexOfFirstItemn,indexOfLastItem);
    const totalPages=Math.ceil(posts?.length/cardsPerPage);

    const handlePrev=()=>{
        setCurrentPage((prev)=>Math.max(prev-1,1))
    }

    const handleNext=()=>{
        setCurrentPage((next)=>Math.min(next+1,totalPages))
    }

    const handlePageClick=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        appwriteService.getPosts([])
    .then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    },[posts])


    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.length===0?
                <h1 className="text-2xl font-bold hover:text-gray-500 text-center w-full">
                Currently, There are no posts to read.
                </h1>: 
                currentItems.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                    </div>
                ))  
                }
            </div>
            <div className='flex justify-center my-5'>
                <button className='bg-green-500 text-white border-none py-2 px-4 mx-1 cursor-pointer rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed' onClick={handlePrev} disabled={currentPage==1}>Prev</button>
                {Array.from({length:totalPages},(_,index)=>(
                    <button className={`bg-green-500 text-white border-none py-2 px-4 mx-1 cursor-pointer rounded-md ${index+1==currentPage?"bg-blue-700 text-white":""}`} onClick={()=>handlePageClick(index+1)}>{index+1}</button>
                ))}
                <button className='bg-green-500 text-white border-none py-2 px-4 mx-1 cursor-pointer rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed' onClick={handleNext} disabled={currentPage==totalPages}>Next</button>
            </div>
        </Container>
    </div>
  )
}

export default AllPost
