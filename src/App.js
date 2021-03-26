import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client';
import Books from './components/Books'
import Login from './components/Login';
import Authors from './components/Authors'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [ token, setToken ] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = window.localStorage.getItem('library-token');
    if(token) setToken(token);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('library-token');
    client.resetStore();
  }

  const login = (token) => {
    setToken(token);
    setPage('authors');
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token && <button onClick={() => setPage('add')}>add book</button>
        }
        {
          !token && <button onClick={() => setPage('login')}>login</button>
        }
        {
          token && <button onClick={ logout }>logout</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add' && token}
      />

      <Login
        show={page === 'login'}
        setToken={ login }
      />

    </div>
  )
}

export default App
