import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const BooksCard = ({ bookData, isWishlisted, toggleWishlist }) => {
  const { title, id, authors, subjects, formats } = bookData;

  // Access the cover image URL
  const imageUrl = formats["image/jpeg"];

  return (
    <div>
      <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
        {/* cover img */}
        <figure>
          <img src={imageUrl} alt="books" />
        </figure>
        <div className="card-body">
          {/* book id */}
          <h2 className="card-title">Book ID: {id} </h2>
          
          {/* book title */}
          <h2 className="card-title">Title: {title} </h2>
          
          {/* author name */}
          <div>
            <p className="font-bold">Author(s):</p>
            <ol>
              {authors.map((author, index) => (
                <li key={index}>
                  {index + 1}. {author.name}
                  {/* Display birth and death years */}
                  {author.birth_year && (
                    <span>
                      ({author.birth_year} - {author.death_year})
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* display Genre (subjects) */}
          <div>
            <p className="font-bold">Genre(s):</p>
            <ul>
              {subjects.map((subject, index) => (
                <li key={index}>
                  {index + 1}. {subject}
                </li>
              ))}
            </ul>
          </div>

          {/* Wishlist Icon */}
        <button onClick={() => toggleWishlist(bookData)} className="btn btn-ghost">
          {isWishlisted ? <FaHeart  className="text-3xl" /> : <FaRegHeart className="text-3xl" />}
        </button>

        </div>
      </div>
    </div>
  );
};

export default BooksCard;