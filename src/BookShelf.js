import React, { Component } from "react";
import Book from './Book'

export default class BookShelf extends Component {
  render() {
    const { title, books, onUpdateBook } = this.props;
    console.log(books)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} onUpdateBook={onUpdateBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
