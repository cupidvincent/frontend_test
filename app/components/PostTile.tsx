'use client'

import React, {useState, useEffect} from 'react'

type Props = {
    userId: Number
}

type UserPosts = {
    userId: Number,
    id: Number,
    title: String,
    body: String
}

export default function PostTile({userId}: Props) {

    const [posts, setPosts] = useState<UserPosts[]>([])

    const getPosts = async () => {
        const postData = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then((response) => response.json())
            .then((json) => json);
        setPosts([...postData])
    }

    useEffect(() => {
        getPosts()
    }, [userId])
    

  return (
    <div>
        {
            posts && posts.map((p, i) => {
                return (
                    <div key={i} className='eachPost-container'>
                        <h1 className='postTitle'>{p.title}</h1>
                        <p className='postDescription'>`{p.body}`</p>
                    </div>
                )
            })
        }
    </div>
  )
}