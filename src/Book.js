import React, { Component } from "react";

export default class Book extends Component {
  state = {
    status: this.props.book.shelf
  }

  handleStateChange = (event) => {
    this.props.onUpdateBook(this.props.book, event.target.value);
  };

  render() {
    const { book } = this.props;
    var imgUrl;
    if (book.imageLinks === undefined || book.imageLinks.thumbnail === undefined) {
      console.log("no image link")
    } else {
      imgUrl = book.imageLinks.thumbnail;
    }
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${imgUrl})`              
            }}
          />
          <div className="book-shelf-changer">
            <select value={this.state.status} onChange={this.handleStateChange}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}
