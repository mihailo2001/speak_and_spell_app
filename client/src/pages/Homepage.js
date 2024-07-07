import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpandableCard from '../components/ExpandableCard';
import PostCard from '../components/PostCard';

const Homepage = () => {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/aboutUsData.json');
        setAboutUsData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/courses');
        setCourses(response.data.listOfCourses);
      } catch (error) {
        console.error('Error fetching the courses', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts/5posts');
        const postsData = response.data.listOfPosts;

        const postsWithImages = [];
        for (const post of postsData) {
          try {
            const filesResponse = await axios.get(`http://localhost:3001/posts/${post.id}/files`);
            const files = filesResponse.data;
            const image = files.length > 0 ? files[0].filename : '';
      
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

    fetchData();
    fetchCourses();
    fetchPosts();
  }, []);

  return (

    <div className='homePage'>
      <div className='mainDiv'>
        <div className='mainDivText'>
          <h1>Welcome to Speak&Spell, where English is fun!</h1>
          <p>Let's inspire curiosity and confidence in every child. Join us on an exciting journey to fluency through games, songs, and creative activities. Start your language adventure today!</p>
        </div>
        <img src='images/mainImage.webp' alt='mainImage'></img>
      </div>

      <div className='aboutUs'>
        <h1>O Speak&Spell školi</h1>
        <div className='cardsInDiv'>
          {aboutUsData.map((item, index) => (
            <ExpandableCard key={index} image={item.imgSrc} title={item.title} text={item.text} />
          ))}
        </div>
      </div>

      <div className='courseDiv'>
      <h1>Our Courses</h1>
        <div className='cardsInDiv'>
          {courses.map((course, index) => (
            <ExpandableCard key={index} image='' title={course.title} text={course.description}/>
          ))}
        </div>
      </div>

      <div className='recentBlogs'>
        <h1>Recent Blog Posts</h1>
        <div className='cardsInDiv'>
          {posts.map((post, index) => (
            <PostCard key={index} postId={post.id} image={`http://localhost:3001/static/${post.image}`} title={post.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
