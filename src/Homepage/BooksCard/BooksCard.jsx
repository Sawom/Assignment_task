import React from "react";

const BooksCard = ({ bookData }) => {
  const { title, id, authors, subjects, formats } = bookData;

  // Access the cover image URL
  const imageUrl = formats["image/jpeg"];

  return (
    <div>
      <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
        <figure>
          <img src={imageUrl} alt="books" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Book ID: {id} </h2>
          <h2 className="card-title">Title: {title} </h2>

          {/* author name */}
          <div>
            <p className="font-bold">Author(s):</p>
            <ol>
              {authors.map((author, index) => (
                <li key={index}>
                  {index + 1}. {author.name || "not found"}
                  {/* Optional: Display birth and death years */}
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
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
