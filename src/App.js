import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_USER } from './queries';
import Books from './components/Books'
import Login from './components/Login';
import Authors from './components/Authors'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations';

const App = () => {
  const [page, setPage] = useState('authors')
  const [ user, setUser ] = useState(null);
  const result = useQuery(GET_USER);
  const client = useApolloClient();

  useEffect(() => {
    if(result.data)
    {
      const user = result.data.me;
      setUser(user);
    }
  }, [result.data]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('library-token');
    client.resetStore();
  }

  const login = () => {
    setPage('authors');
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          user && <button onClick={() => setPage('add')}>add book</button>
        }
        {
          user && <button onClick={() => setPage('recommend')}>recommend</button>
        }
        {
          !user && <button onClick={() => setPage('login')}>login</button>
        }
        {
          user && <button onClick={ logout }>logout</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add' && user}
      />

      <Recommendations
        show={page === 'recommend' && user}
        favorite={ user ? user.favoriteGenre : null }
      />

      <Login
        show={page === 'login'}
        setToken={ login }
      />

    </div>
  )
}

export default App
