import React from "react";
import MovieDataFetcher from "../dataFetching/MovieDataFetcher";

const Upcoming = () => {
  return (
    <MovieDataFetcher
      endpoint="https://api.themoviedb.org/3/movie/upcoming?api_key=7b269e05a4ae4f5629b1515cafb76014"
      transformFunction={(movie) => ({
        title: movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        id: movie.id,
      })}
      title="Upcoming Movies"
    />
  );
};

export default Upcoming;
