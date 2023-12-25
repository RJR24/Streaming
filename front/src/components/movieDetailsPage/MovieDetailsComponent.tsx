import React from "react";
import MovieDetails from "./movieDetailsPage";

import { Video } from "../../../types";

interface MovieDetails {
  id: string;
  title: string;
  genres: { name: string }[];
  release_date: string;
  description: string;
  backdrop_path: string;
  videos: { name: string; key: string; results: Video[] };
}

interface MovieDetailsProps {
  movieDetails: MovieDetails | null;
}

const MovieDetailsComponent: React.FC<MovieDetailsProps> = ({
  movieDetails,
}) => {
  if (!movieDetails) return null;

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">{movieDetails.title}</h1>
      <p className="text-gray-300 mb-4">
        <strong>Genre:</strong>{" "}
        {movieDetails.genres.map((item) => item.name).join(", ")}
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Release Year:</strong> {movieDetails.release_date}
      </p>
      <p className="text-gray-300 mb-6">{movieDetails.description}</p>
    </div>
  );
};

export default MovieDetailsComponent;
