import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeId } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const detail = useSelector((state) => state.recipeDetails);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getRecipeId(params.id));
  }, [dispatch, params.id]);

  return (
    <div className='detail-container'>
      <div>
        <NavLink to='/home'>
          <button className='home-button'>Home</button>
        </NavLink>
        <NavLink to='/create'>
          <button className='create-button'>Create</button>
        </NavLink>
      </div>
      <h2 className='detail-name'>
        {detail.name ? detail.name : detail.title}
      </h2>
      <img
        className='detail-image'
        src={detail.image}
        alt=''
      />
      <div className='detail-info'>
        <div className='detail-dietTypes'>
          <span className='detail-label'>Diet Types:</span>
          <span className='detail-values'>
            {detail.dietTypes
              ? detail.dietTypes
              : detail.diets?.map((d) => d.name)}
          </span>
        </div>
        <div className='detail-summary'>
          <span className='detail-label'>Summary:</span>
          <span className='detail-values'>
            {detail.summary?.replace(/<[^>]*>/g, '')}
          </span>
        </div>

        <div className='detail-steps'>
          <span className='detail-label'>Steps:</span>
          {detail.steps?.map
            ? detail.steps?.map((el, index) => <li key={index}>{el.step}</li>)
            : detail.steps}
        </div>

        <div className='detail-healthScore'>
          <span className='detail-label'>Health Score:</span>
          <span className='detail-values'>{detail.healthScore}</span>
        </div>
      </div>
    </div>
  );
};

export default Detail;
