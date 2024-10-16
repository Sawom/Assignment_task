import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [bookdetails, setBookdetails] = useState({});
  const [loading, setLoading] = useState(true);

  // fetch book details
  useEffect(() => {
    axios.get(`https://gutendex.com/books/${id}`).then((response) => {
      setBookdetails(response.data);
      // console.log(response.data);
      setLoading(false);
    });
  }, [id]);

  const {
    title,
    authors,
    formats,
    subjects,
    bookshelves,
    languages,
    download_count,
    media_type,
  } = bookdetails;

  // Access the cover image URL
  const imageUrl = formats?.["image/jpeg"];

  return (
    <div className="container mx-auto mt-5">
      {/* 1 general info,img */}
      <div className="grid lg:grid-cols-2 mb-8 md:grid-cols-2 grid-cols-1 w-full shadow-xl p-5 gap-4">
        {/* 1st column */}
        <div>
          <figure>
            <img src={imageUrl} alt="books" />
          </figure>
        </div>
        {/* 2nd column */}
        <div>
          {/* book id */}
          <h2 className="text-xl font-bold mb-2">Book Id: {id}</h2>
          {/* book title */}
          <h2 className="text-xl font-bold mb-2"> Title: {title}</h2>
          {/* author name */}
          <div>
            <p className="font-bold">Author(s):</p>
            <ol className="list-decimal ml-5">
              {authors?.map((author, index) => (
                <li key={index}>
                  {author.name}
                  {author.birth_year && (
                    <span>
                      ({author.birth_year} - {author.death_year})
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
          {/* Genre (subjects) */}
          <div>
            <p className="font-bold">Genre(s):</p>

            <ul className="list-disc ml-5">
              {subjects?.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2 others info*/}
      <div className="mb-10 p-5">
        <p className="text-xl font-bold">More Informations:</p>
        <div className="mt-5">
          {/* media type */}
          <p>
            <strong>Media Type:</strong> {media_type}
          </p>
          {/* download count */}
          <p>
            <strong>Download Count:</strong> {download_count}
          </p>

          {/* Bookshelves */}
          <div className="mt-4">
            <strong className="  mb-2">Bookshelves:</strong>
            <ul className="list-decimal ml-5">
              {bookshelves?.map((shelf, index) => (
                <li key={index}>{shelf}</li>
              ))}
            </ul>
          </div>

          {/* languages */}
          <div className="mt-2">
            <strong>Language(s):</strong>
            <ul className="list-decimal ml-5">
              {languages?.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookDetails;