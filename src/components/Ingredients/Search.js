import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const [searchText, setText] = useState('');
  const { filteredIngredients } = props;
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText === inputRef.current.value) {
        const query =
          searchText.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${searchText}"`;
        fetch(
          'https://react-hooks-d8bf3.firebaseio.com/ingredients.json' + query
        )
          .then((res) => res.json())
          .then((res) => {
            filteredIngredients(
              Object.keys(res || {}).reduce(
                (cumm, key) => [...cumm, { id: key, ...res[key] }],
                []
              )
            );
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchText, filteredIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            onChange={(evt) => setText(evt.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
