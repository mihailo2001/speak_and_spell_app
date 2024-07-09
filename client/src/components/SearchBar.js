import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [posts, setPosts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/posts/');
                const postsData = response.data.listOfPosts;
                console.log(postsData);
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching the posts', error);
            }
        };

        fetchPosts();
    }, []);

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setSearchInput(searchWord);
        const newFilter = posts.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === '') {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const handleClick = (postId) => {
        setSearchInput(''); 
        setFilteredData([]);
        navigate(`/post/${postId}`);
    };

    return (
        <div className='search'>
            <div className='searchInput'>
                <div>
                    <input
                        type='text'
                        placeholder='Vas unos...'
                        value={searchInput}
                        onChange={handleFilter}
                    />
                </div>
            </div>

            {filteredData.length !== 0 && (
                <div className='dataResult'>
                    {filteredData.slice(0, 7).map((post) => (
                        <div
                            onClick={() => handleClick(post.id)}
                            key={post.id}
                            className='dataItem'
                        >
                            <p>{post.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
