import axios from "axios";
import React, { useEffect, useState } from "react";
import BooksCard from "../BooksCard/BooksCard";

const Booklists = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data with axios
  useEffect(() => {
    axios.get(`https://gutendex.com/books/`)
      .then((response) => {
        setBooks(response.data.results);
        console.log(response.data.results)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch books");
        setLoading(false);
      });
  }, []);

  return (
  <div className="container mx-auto">
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 my-10'>
        {
            books.map( (bookData)=> <BooksCard
                bookData={bookData} key={bookData.id}
            ></BooksCard> )
        }
    </div>
  </div>
  )
};

export default Booklists;
