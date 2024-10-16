import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  // load wishlist form local-storage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // animation
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-5">My Wishlist</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 my-10">
        {wishlist.length > 0 ? (
          wishlist.map((bookData) => (
            <div  
              data-aos="fade-down"
              key={bookData.id}
              className="card card-compact bg-base-100 w-full h-full shadow-xl"
            >
              <figure>
                <img src={bookData.formats["image/jpeg"]} alt="books" />
              </figure>
              <div className="card-body">
                {/* book id */}
                <p className="card-title">Book ID: {bookData.id}</p>

                {/* book title */}
                <h2 className="card-title">Title: {bookData.title}</h2>

                {/* author name */}
                <div>
                  <p className="font-bold">Author(s):</p>
                  <ol>
                    {bookData.authors.map((author, index) => (
                      <li key={index}>
                        {index + 1}. {author.name}
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
                    {bookData.subjects.map((subject, index) => (
                      <li key={index}>
                        {index + 1}. {subject}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p>No books in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;