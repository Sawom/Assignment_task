import axios from "axios";
import React, { useEffect, useState } from "react";
import BooksCard from "../BooksCard/BooksCard";

const Booklists = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const [totalBooks, setTotalBooks] = useState(0);

  // Load wishlist, search term, and selected genre from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const storedSearchTerm = localStorage.getItem("searchTerm") || "";
    const storedGenre = localStorage.getItem("selectedGenre") || "";

    setWishlist(storedWishlist);
    setSearchTerm(storedSearchTerm);
    setSelectedGenre(storedGenre);
  }, []);

  // Fetch all books and extract subjects for dropdown
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://gutendex.com/books/");
        setBooks(response.data.results);
        extractSubjects(response.data.results);
        setTotalBooks(response.data.count); // Set total books count
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Extract subjects from book data for dropdown
  const extractSubjects = (booksData) => {
    const allSubjects = new Set();
    booksData.forEach((book) => {
      book.subjects.forEach((subject) => allSubjects.add(subject));
    });
    setSubjects([...allSubjects]);
  };

  // Filter books based on search term and selected genre
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? book.subjects.includes(selectedGenre) : true;
    return matchesSearch && matchesGenre;
  });

  // Manage wishlist state
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

  // Handle input change for the search bar
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
    localStorage.setItem("searchTerm", event.target.value);
  };

  // Handle genre selection change
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1); // Reset to first page on genre change
    localStorage.setItem("selectedGenre", event.target.value);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const currentBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Search Bar */}
      <div className="my-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search books by title..."
          className="input input-bordered w-full"
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

      {/* Display Books */}
      <p className="font-bold" > Total books: {books.length} </p>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 my-10">
        {loading ? (
          <p>Loading...</p>
        ) : currentBooks.length > 0 ? (
          currentBooks.map((bookData) => (
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

      {/* Pagination Controls */}
      <div className="flex justify-center my-5">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="btn bg-green-600 text-white mx-2"
        >
          Previous
        </button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn bg-green-600 text-white mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Booklists;