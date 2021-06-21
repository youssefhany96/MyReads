import React, { Component } from "react";
import Book from './Book'
import { Link } from "react-router-dom";

export default class SearchBooks extends Component {
  changefunction = (event) => {
    this.props.OnHandleSearch(event.target.value);
  };


  render() {
    const { books, onUpdateBook } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={this.changefunction} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book ={book} onUpdateBook={onUpdateBook}/>
              </li>
            ))}
          </ol>  
        </div>
      </div>
    );
  }
}
