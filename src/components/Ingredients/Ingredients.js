import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const URL = 'https://react-hooks-d8bf3.firebaseio.com/ingredients.json';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // useEffect(() => {
  //   fetch(URL)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log('results: ', res);
  //       setIngredients(
  //         Object.keys(res).reduce(
  //           (cumm, key) => [...cumm, { id: key, ...res[key] }],
  //           []
  //         )
  //       );
  //     });
  // }, []);

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', ingredients);
  }, [ingredients]);

  const filteredIngredientsHandler = useCallback((ings) => {
    setIngredients(ings);
  }, []);

  const addHandler = (ing) => {
    setIsLoading(true);
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(ing),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setIngredients((prev) => [...prev, { ...ing, id: res.name }]);
      });
  };

  const removeIngredientHandler = (id) => {
    setIsLoading(true);
    fetch(`https://react-hooks-d8bf3.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setIsLoading(false);
        setIngredients((prev) => prev.filter((ing) => ing.id !== id));
      })
      .catch(() => setError('Something went wrong!'));
  };

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        submitForm={(ing) => addHandler(ing)}
        loading={isLoading}
      />

      <section>
        <Search filteredIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
