import React, { useEffect, useState } from "react";
import Carousel from "../carousels/Carousel";
import axios from "axios";

const MovieDataFetcher: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [top10MoviesUK, setTop10MoviesUK] = useState([]);

  useEffect(() => {
    // Function to fetch trending movies
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=7b269e05a4ae4f5629b1515cafb76014",
          {
            params: {
              api_key: process.env.STREAMING_MOVIE_API_KEY,
            },
          }
        );
        const trendingMoviesData = response.data.results.map((movie) => ({
          title: movie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          id: movie.id,
        }));
        console.log(response.data);

        setTrendingMovies(trendingMoviesData);
        console.log(trendingMovies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    // Function to fetch top 10 movies in the UK
    const fetchTop10MoviesUK = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=7b269e05a4ae4f5629b1515cafb76014",
          {
            params: {
              api_key: process.env.STREAMING_MOVIE_API_KEY,
              region: "0044", // Country code for the UK
            },
          }
        );
        const Top10MoviesUK = response.data.results.map((movie) => ({
          title: movie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          id: movie.id,
        }));
        setTop10MoviesUK(Top10MoviesUK);
      } catch (error) {
        console.error("Error fetching top 10 movies in the UK:", error);
      }
    };

    // Call the functions when the component mounts
    fetchTrendingMovies();
    fetchTop10MoviesUK();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <Carousel title="Trending" items={trendingMovies} />
      <Carousel title="Today's Top 10 List in UK" items={top10MoviesUK} />
    </>
  );
};

export default MovieDataFetcher;
