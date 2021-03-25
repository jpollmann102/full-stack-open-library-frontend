import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const AuthorForm = () => {
  const [ name, setName ] = useState('');
  const [ born, setBorn ] = useState('');

  const [ editAuthor, result ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });

  useEffect(() => {
    if(result.data && result.data.editAuthor === null)
    {
      console.log('person not found');
    }
  }, [result]);

  const submit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born: Number(born) } });

    setName('');
    setBorn('');
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={ submit }>
        <div>
          name
          <input value={ name } onChange={ ({ target }) => setName(target.value) } />
        </div>
        <div>
          born
          <input type='number' value={ born } onChange={ ({ target }) => setBorn(target.value) } />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorForm;
