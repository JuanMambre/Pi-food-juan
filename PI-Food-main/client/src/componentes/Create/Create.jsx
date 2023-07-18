import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe, getDiets } from '../../Redux/Actions';

import './create.css';

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const diets = useSelector((state) => state.dietTypes);
  const [errors, setErrors] = useState({});

  const Validations = (recipeData) => {
    let errors = {};

    if (!recipeData.title) errors.title = 'You must provide a name.';
    else if (recipeData.title.length > 30)
      errors.title = 'Too many characters.';
    else if (
      /[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+/g.test(
        recipeData.title
      )
    )
      errors.title = 'Name must have only letters.';

    if (!recipeData.summary) {
      errors.summary = 'Summary is required';
    } else if (recipeData.summary.length > 300) {
      errors.summary = 'Too many characters';
    }

    if (!recipeData.healthScore) {
      errors.healthScore = 'Enter Health Score';
    } else if (recipeData.healthScore < 0 || recipeData.healthScore > 100) {
      errors.healthScore = 'Must provide a number between 0 and 100.';
    }

    if (!recipeData.steps) {
      errors.steps = 'Enter steps';
    }

    if (
      !recipeData.image &&
      !recipeData.image.match(
        /(http[s]*:\/\/)([a-z\-_0-9/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_/._~:?#[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png|gif)/i
      )
    ) {
      errors.image = 'Invalid image, must be a URL';
    }

    if (recipeData.dietTypes.length === 0) {
      errors.dietType = 'Select at least one diet type';
    }

    return errors;
  };

  const [recipeData, setRecipeData] = useState({
    title: '',
    summary: '',
    healthScore: 0,
    steps: '',
    image: '',
    dietTypes: [],
  });

  useEffect(() => {
    if (Validations(recipeData)) {
      setErrors(Validations(recipeData));
    }

    if (!diets.length) {
      dispatch(getDiets());
    }
  }, [dispatch, diets, recipeData]);

  const handleChange = (event) => {
    setRecipeData({
      ...recipeData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      Validations({
        ...recipeData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !recipeData.title ||
      !recipeData.summary ||
      !recipeData.healthScore ||
      !recipeData.steps ||
      !recipeData.image ||
      !recipeData.dietTypes.length === 0
    ) {
      alert('You must complete the form');
    } else {
      dispatch(postRecipe(recipeData));
      alert('Recipe created succesfully');
      setRecipeData({
        title: '',
        summary: '',
        healthScore: 0,
        steps: '',
        image: '',
        dietTypes: [],
      });
      navigate('/home');
    }
  };

  const handleSelect = (event) => {
    setRecipeData((state) => {
      if (event.target.name === 'dietTypes') {
        if (!recipeData.dietTypes.includes(event.target.value)) {
          return {
            ...state,
            dietTypes: [...state.dietTypes, event.target.value],
          };
        } else {
          return { ...state, dietTypes: [...state.dietTypes] };
        }
      }
    });

    setErrors(
      Validations({
        ...recipeData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleDelete = (event) => {
    setRecipeData({
      ...recipeData,
      dietTypes: recipeData.dietTypes.filter((el) => el !== event),
    });
  };

  return (
    <div className='create-container'>
      <form
        className='create-form'
        onSubmit={(event) => handleSubmit(event)}
      >
        <NavLink to='/home'>
          <button className='back-button'>Back to home</button>
        </NavLink>
        <label htmlFor='title'>Name: </label>
        <input
          onChange={(event) => handleChange(event)}
          type='text'
          name='title'
          placeholder='Name'
          required
          value={recipeData.title}
        />
        <p className='error'>{errors.title}</p>
        <hr />

        <label htmlFor='summary'>Summary: </label>
        <textarea
          onChange={(event) => handleChange(event)}
          type='text'
          name='summary'
          placeholder='Summary'
          required
          value={recipeData.summary}
        />
        <p className='error'>{errors.summary}</p>
        <hr />

        <label htmlFor='healthScore'>Health Score: </label>
        <input
          onChange={(event) => handleChange(event)}
          type='number'
          name='healthScore'
          placeholder='Health Score'
          value={recipeData.healthScore}
        />
        <p className='error'>{errors.healthScore}</p>
        <hr />

        <label htmlFor='steps'>Steps: </label>
        <textarea
          onChange={(event) => handleChange(event)}
          type='text'
          name='steps'
          placeholder='Steps'
          value={recipeData.steps}
        />
        <p className='error'>{errors.steps}</p>
        <hr />

        <label htmlFor='image'>Image: </label>
        <input
          onChange={(event) => handleChange(event)}
          type='text'
          name='image'
          placeholder='Image'
          value={recipeData.image}
        />
        <p className='error'>{errors.image}</p>
        <hr />

        <label htmlFor='dietTypes'>Diet Types: </label>
        <select
          name='dietTypes'
          id='dietTypes'
          placeholder='Diet Types'
          defaultValue='def'
          onChange={(event) => handleSelect(event)}
        >
          <option
            value='def'
            key='def'
            disabled
          >
            Select an option below.
          </option>
          {diets.map((el) => {
            return (
              <option
                value={el.id}
                key={el.id}
              >
                {el.name}
              </option>
            );
          })}
        </select>
        <p className='error'>{errors.dietTypes}</p>

        <div className='dietTypes-container'>
          {recipeData.dietTypes.length > 0 ? (
            recipeData.dietTypes.map((dietType) => (
              <div
                className='dietType-item'
                key={dietType}
              >
                <p>{dietType}</p>
                <button onClick={() => handleDelete(dietType)}>X</button>
              </div>
            ))
          ) : (
            <p className='no-dietTypes'>
              No se han seleccionado tipos de dieta
            </p>
          )}
        </div>

        <button
          className='submit-button'
          type='submit'
          disabled={Object.keys(errors).length === 0 ? false : true}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
