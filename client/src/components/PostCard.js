import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ postId, image, title }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="post-card" onClick={handleCardClick}>
      <img src={image} alt={title} className="post-card-image" />
      <h3 className="post-card-title">{title}</h3>
    </div>
  );
};

export default PostCard;
