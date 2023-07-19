import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllRecipes, getDiets, getRecipesByName } from '../../Redux/Actions';
import { NavLink } from 'react-router-dom';
import './SearchBar.css';
import Menu from '../Icons/Menu.jsx';

const SearchBar = ({ openSideBar, setPage }) => {
  const dispatch = useDispatch();

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

  const refresh = () => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
    setPage(1);
  };

  return (
    <div className='navbar'>
      <span className='navbar-menu-container'>
        <Menu
          className='navbar-menu'
          onClick={openSideBar}
        />
      </span>
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
      <button
        className='navbar-button'
        onClick={() => refresh()}
      >
        Refresh
      </button>
    </div>
  );
};
export default SearchBar;
