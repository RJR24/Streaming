// MovieDataFetcher.tsx
import React, { useEffect, useState } from "react";
import Carousel from "../carousels/Carousel";
import axios from "axios";

interface MovieDataFetcherProps {
  endpoint: string;
  transformFunction: (movie: any) => { title: string; imageUrl: string; id: string };
  title: string;
}

const MovieDataFetcher: React.FC<MovieDataFetcherProps> = ({ endpoint, transformFunction, title }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        const moviesData = response.data.results.map(transformFunction);
        setMovies(moviesData);
      } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
      }
    };

    fetchData();
  }, [endpoint, transformFunction]);

  return <Carousel title={title} items={movies} />;
};

export default MovieDataFetcher;
