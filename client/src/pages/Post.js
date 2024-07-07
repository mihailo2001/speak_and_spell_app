import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

const Post = () => {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [files, setFiles] = useState([]);
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`)
            .then((response) => {
                setPostObject(response.data);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}/files`)
            .then((response) => {
                setFiles(response.data);
            });
    }, [id]);

    const deletePost = (() => {
        axios.delete(`http://localhost:3001/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(() => {
            navigate('/blog');
        })
    });

    return (
        <div className='postPage'>
            <div className='postContent'>
                <h1> {postObject.title} </h1>
                <div className='postBody'> {postObject.content} </div>
                <div className='autor'>
                    autor: {postObject.User?.username}
                    {authState.username === postObject.User?.username &&
                        <button onClick={() => { deletePost(postObject.id); }}> Delete Post </button>
                    }
                </div>
            </div>
            <div className="imageList">
                {files.map((file) => (
                    <div key={file.id} className="imageItem">
                        <img src={`http://localhost:3001/static/${file.filename}`} alt={file.filename} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Post
