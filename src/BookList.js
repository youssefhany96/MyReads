import React, { Component } from "react";
import BookShelf from './BookShelf'
import { Link } from "react-router-dom";

export default class BookList extends Component { 
  render() {
    const {  books, onUpdateBook } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={books.filter(
                (book) => book.shelf === "currentlyReading"
              )}
              onUpdateBook={onUpdateBook}
            />
            <BookShelf
              title="Want to Read"
              books={books.filter(
                (book) => book.shelf === "wantToRead"
              )}
              onUpdateBook={onUpdateBook}
            />
            <BookShelf
              title="Read"
              books={books.filter((book) => book.shelf === "read")}
              onUpdateBook={onUpdateBook}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}
