import React, { useEffect, useState } from "react";
import Carousel from "../carousels/Carousel";
import axios from "axios";

interface MovieItem {
  title: string;
  imageUrl: string;
  id: string;
  voteAverage: number;
  originalLanguage: string;
}

interface MovieDataFetcherProps {
  endpoint: string;
  title: string;
}

const MovieDataFetcher: React.FC<MovieDataFetcherProps> = ({
  endpoint,
  title,
}) => {
  const [movies, setMovies] = useState<MovieItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);

        const transformFunction = (movie: any): MovieItem => {
          return {
            title: movie.title || "No Title",
            imageUrl: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "", // Adjust the path accordingly
            id: movie.id.toString(),
            voteAverage: Math.round(movie.vote_average * 10) / 10,
            originalLanguage: movie.original_language || "N/A",
          };
        };

        const moviesData = response.data.results.map(transformFunction);
        setMovies(moviesData);
      } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
      }
    };

    fetchData();
  }, [endpoint]);

  return <Carousel title={title} items={movies} />;
};

export default MovieDataFetcher;
