import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, GET_USER } from '../queries';

const Login = ({ show, setToken }) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ loginUser, result ] = useMutation(LOGIN, {
    refetchQueries: [ { query: GET_USER } ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if(result.data)
    {
      const token = result.data.login.value;
      setToken();
      localStorage.setItem('library-token', token);
    }
  }, [result.data]);


  if (!show) {
    return null
  }

  const login = (event) => {
    event.preventDefault();

    loginUser({ variables: { username, password } });
    setUsername('');
    setPassword('');
  }

  return (
    <div>
      <form onSubmit={ login }>
        <div>
          username
          <input value={ username } onChange={ ({ target }) => setUsername(target.value) } />
        </div>
        <div>
          password
          <input type="password" value={ password } onChange={ ({ target }) => setPassword(target.value) } />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login;
