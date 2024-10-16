import axios from "axios";
import React, { useEffect, useState } from "react";
import BooksCard from "../BooksCard/BooksCard";

const Booklists = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  // load wishlist from local-storage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // fetch data with axios
  useEffect(() => {
    axios
      .get(`https://gutendex.com/books/`)
      .then((response) => {
        setBooks(response.data.results);
        console.log(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch books");
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

  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 my-10">
        {books.map((bookData) => (
          <BooksCard
            bookData={bookData}
            key={bookData.id}

            isWishlisted={wishlist.some(
              (wishlistedBook) => wishlistedBook.id === bookData.id
            )}
            
            toggleWishlist={toggleWishlist}
          ></BooksCard>
        ))}
      </div>
    </div>
  );
};

export default Booklists;
