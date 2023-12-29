import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Swal from "sweetalert2";
import axios from "axios";

import CategoryDataFetcher from "../../../components/dataFetching/CategoryDataFetcher";

const CategoryDetailsPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [newMovie, setNewMovie] = useState({ title: "", genre: "" });
  const [data, setData] = useState<Movie[]>([]);

  if (!category) {
    // Handle loading or error state
    return <div>Loading...</div>;
  }
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const tmdbUrl = process.env.NEXT_PUBLIC_API_URL;

  const categoryApiUrls = {
    popular: `${tmdbUrl}/movie/popular?api_key=${apiKey}`,
    top10MoviesUK: `${tmdbUrl}/movie/top_rated?api_key=${apiKey}`,
    tvShow: `${tmdbUrl}/trending/all/day?api_key=${apiKey}`,
    upcomingMovies: `${tmdbUrl}/movie/upcoming?api_key=${apiKey}`,
  };

  const handleInputChange = (e, field) => {
    setNewMovie({ ...newMovie, [field]: e.target.value });
  };

  const handleAddMovie = () => {
    if (!newMovie.title || !newMovie.genre) {
      // Check if title or id is empty
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter both title and genre.",
      });
      return;
    }
    // Get the "x-auth-token" from local storage
    const authToken = localStorage.getItem("x-auth-token");

    // Include the token in the request headers
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": authToken,
    };

    const payload = {
      title: newMovie.title,
      genre: newMovie.genre,
      category: selectedCategory,
    };
    console.log("🚀 ~ file: [category].tsx:58 ~ handleAddMovie ~ payload:", payload)

    axios
      .post("http://localhost:8000/auth/addMovie", payload, { headers })
      .then((response) => {
        console.log(response.data);
        // Reset the input fields after successfully adding a movie
        setNewMovie({ title: "", genre: "" });
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Movie added successfully!",
        });
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error adding movie. Please try again.",
        });
      });

    // Check if title or id is repetitive
    const isDuplicate = data.some(
      (movie) => movie.title === newMovie.title || movie.id === newMovie.genre
    );

    if (isDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Title or ID is already in use. Please enter unique values.",
      });
      return;
    }
    console.log("Adding movie:", newMovie);

    // Reset the input fields after successfully adding a movie
    setNewMovie({ title: "", genre: "" });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <Head>
        <title>{`${selectedCategory} Details`}</title>
      </Head>
      <h2 className="text-2xl mb-4">{category} Details</h2>
      <div className="mb-4">
        <label className="mr-2">Select Category:</label>
        <select
          className="bg-gray-800 text-white p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="popular">Popular Movies</option>
          <option value="top10MoviesUK">Top 10 Movies (UK)</option>
          <option value="tvShow">TvShow</option>
          <option value="upcomingMovies">Upcoming Movies</option>
        </select>
      </div>
      <CategoryDataFetcher
        categoryUrl={categoryApiUrls[selectedCategory]}
        transformFunction={(movie) => ({
          title: movie.title,
          imageUrl: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
          id: movie.id,
        })}
      >
        {(data) => (
          <table className="w-full whitespace-nowrap">
            <thead className="bg-black/60">
              <tr>
                <th className="text-left py-3 px-2 rounded-l-lg">Image</th>
                <th className="text-left py-3 px-2">Title</th>
                <th className="text-left py-3 px-2">Genre</th>
                <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row for adding a movie */}
              <tr className="border-b">
                <td className="py-3 px-2 font-bold">
                  <div className="inline-flex space-x-3 items-center">
                    <span>
                      <span
                        onClick={handleAddMovie}
                        className="text-green-500 hover:text-green-400 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-12 h-12"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <input
                    type="text"
                    value={newMovie.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    placeholder="Movie title here"
                    className="bg-gray-800 text-white p-2 rounded w-full"
                  />
                </td>
                <td className="py-3 px-2">
                  <input
                    type="text"
                    value={newMovie.genre}
                    onChange={(e) => handleInputChange(e, "genre")}
                    placeholder="Insert genre"
                    className="bg-gray-800 text-white p-2 rounded w-full"
                  />
                </td>
                <td className="py-3 px-2">
                  <button
                    onClick={handleAddMovie}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded w-full"
                  >
                    Add
                  </button>
                </td>
              </tr>

              {/* rows for movie data */}
              {data.map((movie) => (
                <tr
                  key={movie.id}
                  className={`border-b hover:bg-white/10 ${
                    movie.id % 2 === 0 ? "border-gray-700" : "border-gray-800"
                  }`}
                >
                  <td className="py-3 px-2 font-bold">
                    <div className="inline-flex space-x-3 items-center">
                      <span>
                        <img
                          className="rounded-full w-10 h-10"
                          src={movie.imageUrl}
                          alt={`Movie ${movie.title} Poster`}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">{movie.title}</td>
                  <td className="py-3 px-2">{movie.id}</td>
                  <td className="py-3 px-2">
                    <div className="inline-flex items-center space-x-3">
                      <a href="" title="Edit" className="hover:text-blue-500">
                        {/* Edit icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </a>
                      <a href="" title="Remove" className="hover:text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CategoryDataFetcher>
    </div>
  );
};

export default CategoryDetailsPage;
