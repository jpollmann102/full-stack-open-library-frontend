import React from 'react';
import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Recommendations = ({ show, favorite }) => {
  const result = useQuery(ALL_BOOKS);

  if (!show) {
    return null
  }

  if(!favorite)
  {
    return null
  }

  if(result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks;
  const genreBooks = books.filter(b => b.genres.includes(favorite));

  if(genreBooks.length === 0)
  {
    return (
      <div>
        <h1>recommendations</h1>
        <p>no books in your favorite genre <strong>{ favorite }</strong></p>
      </div>
    )
  }

  return (
    <div>
      <h1>recommendations</h1>
      <p>books in your favorite genre <strong>{ favorite }</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {genreBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations;
