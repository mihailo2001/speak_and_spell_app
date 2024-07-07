import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Blog = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/posts/');
                const postsData = response.data.listOfPosts;

                const postsWithImages = [];
                for (const post of postsData) {
                    try {
                        const filesResponse = await axios.get(`http://localhost:3001/posts/${post.id}/files`);
                        const files = filesResponse.data;
                        const image = files.length > 0 ? files[0].filepath : '';

                        postsWithImages.push({ ...post, image });
                    } catch (error) {
                        console.error(`Error fetching files for post ${post.id}`, error);

                    }
                }

                setPosts(postsWithImages);
            } catch (error) {
                console.error('Error fetching the posts', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <div className='blogPage'>
                <h1>Blog</h1>
                <div className='blogs'>
                        {posts.map((post, index) => (
                            <PostCard className='blogCard' key={index} postId={post.id} image={post.image} title={post.title} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Blog
