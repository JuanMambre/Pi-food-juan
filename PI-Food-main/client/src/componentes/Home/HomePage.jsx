import React, { useEffect, useState } from 'react';
import NavBar from '../SearchBar/NavBar';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SideBar from '../SideBar/SideBar';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux'; //useSelector
import { getAllRecipes, getDiets } from '../../Redux/Actions';
import './Home.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [sideBar, setSideBar] = useState(false);

  const openSideBar = () => {
    setSideBar(!sideBar);
  };

  const [page, setPage] = useState(1);
  let [recipeXPage] = useState(9);
  const indexOfLastRecipe = page * recipeXPage; //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipeXPage; //0
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  ); //arr y agarra entre 0 y 9

  const [minPageNumber, setMinPageNumber] = useState(0);
  const [maxPageNumber, setMaxPageNumber] = useState(5);

  const pages = (pageNumber) => {
    setPage(pageNumber);

    if (pageNumber >= maxPageNumber) {
      setMinPageNumber(minPageNumber + 4);
      setMaxPageNumber(maxPageNumber + 4);
    } else if (pageNumber <= minPageNumber + 1 && pageNumber !== 1) {
      setMinPageNumber(minPageNumber - 4);
      setMaxPageNumber(maxPageNumber - 4);
    }
  };

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className='home-main'>
      <NavBar
        openSideBar={openSideBar}
        sideBar={sideBar}
        setPage={setPage}
      />
      <SideBar
        setPage={setPage}
        openSideBar={openSideBar}
        sideBar={sideBar}
      />
      <div className='card-container'>
        {currentRecipes.length ? (
          currentRecipes.map((r) => {
            return (
              <Card
                key={r.id}
                id={r.id}
                title={r.title}
                diets={r.diets}
                image={r.image}
              />
            );
          })
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
      <Paginado
        page={page}
        minPageNumber={minPageNumber}
        maxPageNumber={maxPageNumber}
        recipeXPage={recipeXPage}
        recipesAll={Array.isArray(allRecipes) ? allRecipes.length : 1}
        pages={pages}
      />
    </div>
  );
};

export default HomePage;
