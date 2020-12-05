import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {getFollowingPosts} from '../../services/post'
import DisplayPost from './DisplayPost'

const HomePage = () => {
    const currentUser = useSelector(state => state.users.user)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(currentUser){
            (async () => {
                const postList = await getFollowingPosts(currentUser.id)
                setPosts(postList.posts)
            })()
        }
    }, [currentUser])

    if(!currentUser){
        return (
            <h1>Store is configured poorly</h1>
        )
    }
    return (
        <div>
            {posts.map((post) => {
                return (
                    <DisplayPost key={post.id} id={post.id} caption={post.caption} content={post.content} createdAt={post.createdAt} user={post.user}/>
                )
            })}
        </div>
    )

}

export default HomePage
