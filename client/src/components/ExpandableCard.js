import React, { useState } from 'react';

const ExpandableCard = ({ image, title, text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`}>
      <img src={image} alt={''} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className={'card-text'}>{text}</p>
      <button className="expand-button" onClick={toggleExpand}>
        {isExpanded ? 'Manje' : 'Vise'}
      </button>
    </div>
  );
};

export default ExpandableCard;
