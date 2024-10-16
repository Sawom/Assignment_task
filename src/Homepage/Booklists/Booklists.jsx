import axios from "axios";
import React, { useEffect, useState } from "react";
import BooksCard from "../BooksCard/BooksCard";

const Booklists = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // load wishlist and search books from local-storage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const storedSearchTerm = localStorage.getItem("searchTerm") || "";
    setWishlist(storedWishlist);
    setSearchTerm(storedSearchTerm);
  }, []);

  // Save search books to localStorage whenever it changed
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  // fetch data with axios
  useEffect(() => {
    axios.get(`https://gutendex.com/books/`)
      .then((response) => {
        setBooks(response.data.results);
        // console.log(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // toggle book in wishlist
  const toggleWishlist = (book) => {
    const isWishlisted = wishlist.some(
      (wishlistedBook) => wishlistedBook.id === book.id
    );
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = wishlist.filter(
        (wishlistedBook) => wishlistedBook.id !== book.id
      );
    } else {
      updatedWishlist = [...wishlist, book];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // handle input search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // filtered books based on the search books
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      {/* search bar */}
      <div className="my-5 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search books by title..."
          className="input input-bordered "
          style={{width:"80%"}}
        />
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 my-10">
        {loading ? (
          <p>Loading...</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((bookData) => (
            <BooksCard
              bookData={bookData}
              key={bookData.id}
              isWishlisted={wishlist.some(
                (wishlistedBook) => wishlistedBook.id === bookData.id
              )}
              toggleWishlist={toggleWishlist}
            ></BooksCard>
          ))
        ) : (
          <p>No books found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Booklists;
