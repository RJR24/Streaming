// Top10MoviesUK.tsx
import React from "react";
import MovieDataFetcher from "../dataFetching/MovieDataFetcher";

const Top10MoviesUK = () => {
  return (
    <MovieDataFetcher
      endpoint="https://api.themoviedb.org/3/movie/top_rated?api_key=7b269e05a4ae4f5629b1515cafb76014&region=0044"
      transformFunction={(movie) => ({
        title: movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        id: movie.id,
      })}
      title="Today's Top 10"
    />
  );
};

export default Top10MoviesUK;
