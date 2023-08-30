
import React from 'react'
import PostTile from '../../components/PostTile'

type Props = {
  params: { slug: Number } 
}

export default function page({params}: Props) {

  return (
    <div className='post-page'>
        <h1 className='post-h1'>Posts of user</h1>
        <PostTile userId={params.slug}/>
    </div>
  )
}