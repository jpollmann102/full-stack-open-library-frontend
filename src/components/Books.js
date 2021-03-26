import React, { useState } from 'react'
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE, BOOK_ADDED } from '../queries';
import { useQuery, useLazyQuery, useSubscription } from '@apollo/client';

const Books = ({ show, updateCacheWith }) => {
  const [ genreFilter, setGenreFilter ] = useState('');

  const result = useQuery(ALL_BOOKS);
  const [ getGenre, { called, loading, data } ] = useLazyQuery(ALL_BOOKS_BY_GENRE, { variables: { genre: genreFilter } });

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
    }
  });

  if (!show) {
    return null
  }

  if(result.loading || (called && loading)) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks;
  const filteredBooks = data && genreFilter ? data.allBooks : null;

  console.log('filteredBooks', filteredBooks);

  const booksContent = () => {
    if(filteredBooks)
    {
      return (
        <>
          {filteredBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </>
      )
    }else
    {
      return (
        <>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </>
      )
    }
  }

  const genreButtons = () => {
    let genres = [];
    books.forEach(b => genres = genres.concat(b.genres));
    const uniqueGenres = new Set(genres);
    const finalGenres = Array.from(uniqueGenres);
    return (
      <>
        {finalGenres.map(g =>
          <button key={ g } onClick={ () => updateBooks(g) }>{ g }</button>
        )}
        <button onClick={ () => setGenreFilter('') }>all genres</button>
      </>
    )
  }

  const updateBooks = (genre) => {
    setGenreFilter(genre);
    console.log(genre);
    getGenre();
  }

  return (
    <div>
      <h2>books</h2>

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
          { booksContent() }
        </tbody>
      </table>
      { genreButtons() }
    </div>
  )
}

export default Books
