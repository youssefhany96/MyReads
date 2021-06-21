import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookList from './BookList'
import { Route, Switch } from "react-router-dom";


class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
  }
  
  componentDidMount() {
    BooksAPI.getAll().then(info => {
      this.setState({
        books: info
      })
    })
  } 

  OnHandleSearch = (query) => {
    if (query) {
      BooksAPI.search(query)
        .then(new_books => {
          if(new_books.length) {
            console.log(new_books)
            new_books = new_books.filter((book) => {
              for(let i=0; i< this.state.books.length; i++) {
                let b = this.state.books[i];
                if (b.id === book.id) {
                  book.shelf = b.shelf;
                }
              }
              if (book.shelf === undefined) book.shelf = "none";
              return book;
            });

            this.setState({ searchedBooks: new_books});
            console.log(this.state.searchedBooks)
          } else {
            this.setState({ searchedBooks: [] });
          } 
        })
    } else {
      this.setState({ searchedBooks: [] });
    }          

  }
  
  onUpdateBook = (book, status) => {
    this.setState((currentState) => ({
      currentBooks: currentState.books.filter((b) => {
        if (b.id === book.id) {
          b.shelf = status;
        }
        return b;
      }),
    }));
    BooksAPI.update(book, status);
  };

  onUpdateSearchedBook = (book, status) => {
    book.shelf = status;
    this.setState(currentState => ({
      books: currentState.books
      .filter(b => b.id !== book.id)
      .concat([book])
    }));
    this.setState(currentState => ({
      searchedBooks: currentState.searchedBooks
        .filter(b => b.id !== book.id)
        .concat([book])
    }));
    BooksAPI.update(book, status);
  };

  render() {
    const { books, searchedBooks } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <BookList
                books={books}
                onUpdateBook={this.onUpdateBook}
              />
            )}
          />
          <Route  
            path="/search"
            render={() => (
              <SearchBooks
              books={searchedBooks}
              OnHandleSearch={this.OnHandleSearch}
              onUpdateBook={this.onUpdateSearchedBook}
              />
            )}
          />
        </Switch>      
      </div>
    )
  }
}

export default BooksApp
