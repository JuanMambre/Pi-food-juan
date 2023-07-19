import React from 'react';
import './Paginado.css';

export default function PaginationComponent({
  page,
  minPageNumber,
  maxPageNumber,
  recipesAll,
  recipeXPage,
  pages,
}) {
  const arrPages = []; //guardo todas las pags
  for (let i = 1; i <= Math.ceil(recipesAll / recipeXPage); i++) {
    arrPages.push(i);
  }

  const handlePrev = () => page - 1 && pages(page - 1);
  const handleNext = () => page !== arrPages.length && pages(page + 1);

  return (
    <div className='pagination-component'>
      <ul className='pagination-container'>
        <button
          className='pagination-button prev'
          disabled={page === 1 ? true : false}
          onClick={handlePrev}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
          >
            <path d='M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z' />
          </svg>
        </button>
        {arrPages &&
          arrPages.slice(minPageNumber, maxPageNumber).map((num) => (
            <button
              className={`pagination-button ${page === num ? 'active' : ''}`}
              key={num}
              onClick={() => pages(num)}
            >
              {num}
            </button>
          ))}
        <button
          onClick={handleNext}
          disabled={page === arrPages.length ? true : false}
          className='pagination-button next'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
          >
            <path d='M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z' />
          </svg>
        </button>
      </ul>
    </div>
  );
}
