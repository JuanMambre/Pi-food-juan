import React from 'react';
import { NavLink } from 'react-router-dom';
import './Card.css';

const Card = ({ title, diets, image, id }) => {
  return (
    <div className='card'>
      <NavLink to={`/detail/${id}`}>
        <img
          className='card-image'
          src={image}
          alt={`${title}-image`}
        />
        <div className='card-content'>
          <h2 className='card-name'>{title}</h2>
          <div className='card-tags-container'>
            {diets.map((el) => {
              return (
                <span class='card-diet-tag'>{el.name ? el.name : el}</span>
              );
            })}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;
