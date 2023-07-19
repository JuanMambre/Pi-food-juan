import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByDiets,
  getAllRecipes,
  getRecipesByName,
  sortRecipesByName,
  sortRecipesByScore,
  getDiets,
} from '../../Redux/Actions';
import Cross from '../Icons/Cross.jsx';

import './side.css';

export default function SideBar({ setPage, sideBar, openSideBar }) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.dietTypes);
  const handleSortByName = (event) => {
    if (event.target.value === 'reset') {
      dispatch(getAllRecipes());
      setPage(1);
    } else {
      dispatch(sortRecipesByName(event.target.value));
      setPage(1);
    }
  };

  const handleSortByScore = (event) => {
    if (event.target.value === 'reset') {
      dispatch(getAllRecipes());
      setPage(1);
    } else {
      dispatch(sortRecipesByScore(event.target.value));
      setPage(1);
    }
  };

  const handleFilterByDiets = (event) => {
    if (event.target.value === 'reset') {
      dispatch(getAllRecipes());
      dispatch(getDiets());
      setPage(1);
    } else {
      event.preventDefault();
      setPage(1);
      dispatch(filterByDiets(event.target.value));
    }
  };

  return (
    <div className={sideBar ? 'sidebar sidebar__open' : 'sidebar'}>
      <button
        onClick={openSideBar}
        className='sidebar-button'
      >
        Close
        <Cross className='cross-icon' />
      </button>
      <select
        name='sort'
        onChange={(event) => handleSortByName(event)}
        className='navbar-button'
        defaultValue='default'
      >
        <option
          value='default'
          label='Order alphabetically'
          disabled
        />
        <option
          value='reset'
          label='Remove order'
        />
        <option
          value='asc'
          label='A-Z'
        />
        <option
          value='dsc'
          label='Z-A'
        />
      </select>
      <select
        name='sort'
        onChange={(event) => handleSortByScore(event)}
        className='navbar-button'
        defaultValue='default'
      >
        <option
          value='default'
          label='Order by health score'
          disabled
        />
        <option
          value='reset'
          label='Remove order'
        />
        <option
          value='asc'
          label='Highest'
        />
        <option
          value='dsc'
          label='Lower'
        />
      </select>
      <select
        name='diet'
        onChange={(event) => handleFilterByDiets(event)}
        className='navbar-button'
        defaultValue='default'
      >
        <option
          value='default'
          label='Filter by diets'
          disabled
        />
        <option
          value='reset'
          label='Reset filters'
        />
        {diets &&
          diets.map((die) => (
            <option
              key={die.name}
              value={die.name}
              label={die.name}
            />
          ))}
      </select>
    </div>
  );
}
