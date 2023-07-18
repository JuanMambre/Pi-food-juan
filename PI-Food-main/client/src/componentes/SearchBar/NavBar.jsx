import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByDiets,
  getAllRecipes,
  getRecipesByName,
  sortRecipesByName,
  sortRecipesByScore,
} from '../../Redux/Actions';
import { NavLink } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ setPage }) => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.dietTypes);

  const [name, setName] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      alert('Please provide a recipe name.');
    } else {
      dispatch(getRecipesByName(name.trim()));
      setName('');
      event.target.reset();
    }
  };

  const handleSearchInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSortByName = (event) => {
    dispatch(sortRecipesByName(event.target.value));
    setPage(1);
  };

  const handleSortByScore = (event) => {
    dispatch(sortRecipesByScore(event.target.value));
    setPage(1);
  };

  const handleFilterByDiets = (event) => {
    event.preventDefault();
    setPage(1);
    dispatch(filterByDiets(event.target.value));
  };

  return (
    <div className='navbar'>
      <form
        className='search-bar'
        onSubmit={handleSearchSubmit}
      >
        <input
          className='search-input'
          type='text'
          onChange={(event) => handleSearchInputChange(event)}
          placeholder='Search recipe'
        />
        <button
          className='navbar-button'
          type='submit'
        >
          Search
        </button>
      </form>
      <NavLink to='/create'>
        <button className='navbar-button'>Create</button>
      </NavLink>

      <select
        name='sort'
        onChange={(event) => handleSortByName(event)}
        className='navbar-button'
      >
        <option value='asc'>A-Z</option>

        <option value='dsc'>Z-A</option>
      </select>
      <select
        name='sort'
        onChange={(event) => handleSortByScore(event)}
        className='navbar-button'
      >
        <option value='asc'>0-100</option>

        <option value='dsc'>100-0</option>
      </select>
      <select onChange={(event) => handleFilterByDiets(event)}>
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
};
export default SearchBar;
