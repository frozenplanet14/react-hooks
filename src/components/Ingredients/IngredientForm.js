import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  const [state, setState] = useState({
    title: '',
    amount: '',
  });
  const submitHandler = (event) => {
    event.preventDefault();
    props.submitForm({ ...state });
    setState({ title: '', amount: '' });
  };

  const inputHandler = (name, event) => {
    const value = event.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={state.title}
              onChange={(evt) => inputHandler('title', evt)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={state.amount}
              onChange={(evt) => inputHandler('amount', evt)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading ? <LoadingIndicator /> : null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
