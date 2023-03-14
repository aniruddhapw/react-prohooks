import React, { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchTerm}`
      );
      const data = await response.json();
      setBookData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search for a book:
          <input type="text" value={searchTerm} onChange={handleChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {bookData && (
        <div>
          <p>Results for "{searchTerm}":</p>
          {bookData.docs.map((book) => (
            <div key={book.key}>
              <h2>{book.title}</h2>
              <p>Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
              <p>Published: {book.first_publish_year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
