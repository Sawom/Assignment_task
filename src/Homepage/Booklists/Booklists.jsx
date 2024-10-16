import axios from "axios";
import React, { useEffect, useState } from "react";
import BooksCard from "../BooksCard/BooksCard";

const Booklists = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [subjects, setSubjects] = useState([]);

  // load wishlist and search books and selected genre from local-storage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const storedSearchTerm = localStorage.getItem("searchTerm") || "";
    const storedGenre = localStorage.getItem("selectedGenre") || "";

    setWishlist(storedWishlist);
    setSearchTerm(storedSearchTerm);
    setSelectedGenre(storedGenre);
  }, []);

  // fetch data with axios
  useEffect(() => {
    axios.get(`https://gutendex.com/books/`)
      .then((response) => {
        setBooks(response.data.results);
        // console.log(response.data.results);
        extractSubjects(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Extract subjects from book data for dropdown
  const extractSubjects = (booksData) => {
    const allSubjects = new Set();
    booksData.forEach((book) => {
      book.subjects.forEach((subject) => allSubjects.add(subject));
    });
    setSubjects([...allSubjects]);
  };

  // Update the filtered books list based on the search term and selected genre
  useEffect(() => {
    let filtered = books;

    // Filter by title if searchTerm is present
    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre if selectedGenre is present
    if (selectedGenre) {
      filtered = filtered.filter(
        (book) => book.subjects && book.subjects.includes(selectedGenre)
      );
    }

    setFilteredBooks(filtered);

    // Save search term and selected genre in the localStorage
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("selectedGenre", selectedGenre);
  }, [searchTerm, selectedGenre, books]);

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

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

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
          style={{ width: "80%" }}
        />
      </div>

      {/* Genre Dropdown Filter */}
      <div className="my-5">
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="select select-bordered w-full"
        >
          <option value="">All Genres</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
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
            />
          ))
        ) : (
          <p>No books found matching your search or genre.</p>
        )}
      </div>

    </div>
  );
};

export default Booklists;