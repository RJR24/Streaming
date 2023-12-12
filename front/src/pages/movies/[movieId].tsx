import React, { useEffect, useState } from "react";
import MovieDetailsFetcher from "../../components/dataFetching/MovieDetailsFetcher";
import Swal from "sweetalert2";
import axios from "axios";
import Image from "next/image";
import YouTube from "react-youtube";
import { useRouter } from "next/router";

interface Video {
  key: string;
  name: string;
}
interface MovieDetails {
  title: string;
  genres: { name: string }[];
  release_date: string;
  description: string;
  backdrop_path: string;
  videos: { name: string; key: string; results: Video[] };
}
const API_URL = "https://api.themoviedb.org/3";
const MovieDetailsPage: React.FC = () => {
  const addToMyList = async () => {
    try {
      const response = await axios.get<MovieDetails>(`${API_URL}/movie/${id}`, {
        params: {
          api_key: "7b269e05a4ae4f5629b1515cafb76014",
          append_to_response: "videos",
        },
      });
      const movieDetails: MovieDetails = response.data;

      // Add to My List
      await axios.post("/api/user/mylist", { movieId: id });

      // Show success message using Swal2
      Swal.fire({
        icon: "success",
        title: "Added to My List!",
        text: `${movieDetails.title} has been added to your My List.`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      // Handle error
      console.error("Error adding movie to My List:", error);
      // Show error message using Swal2
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const router = useRouter();
  const [id, setId] = useState<string | undefined>();

  useEffect(() => {
    const { movieId } = router.query;
    if (movieId && typeof movieId === "string") {
      setId(movieId);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const response = await axios.get<MovieDetails>(
            `${API_URL}/movie/${id}`,
            {
              params: {
                api_key: "7b269e05a4ae4f5629b1515cafb76014",
                append_to_response: "videos",
              },
            }
          );
          setMovieDetails(response.data);
          console.log("Movie Details:", response.data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto p-8">
          {movieDetails ? (
            <>
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
                {movieDetails?.videos?.results.length > 0 ? (
                  <div className="w-full md:w-1/2 lg:w-2/3 mx-auto">
                    {/* Filter videos to get the trailer with name 'Official Trailer' */}
                    {(() => {
                      console.log("firsttttttttttttttttttt");
                      const trailerVideo = movieDetails?.videos?.results.find(
                        (video) => video.name === "Official Trailer"
                      );
                      return trailerVideo ? (
                        <YouTube
                          videoId={trailerVideo.key}
                          opts={{ width: "100%", height: "500px" }}
                        />
                      ) : (
                        <YouTube
                          videoId={movieDetails?.videos?.results[0]?.key}
                          opts={{ width: "100%", height: "500px" }}
                        />
                      );
                    })()}
                  </div>
                ) : (
                  <div className="w-full md:w-1/2 lg:w-2/3 mx-auto">
                    <Image
                      width={560}
                      height={315}
                      src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
                      alt={movieDetails.title}
                    />
                  </div>
                )}
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto flex flex-col justify-center items-center">
                  <h1 className="text-3xl font-bold mb-4">
                    {movieDetails.title}
                  </h1>
                  <p className="text-gray-300 mb-4">
                    <strong>Genre:</strong>{" "}
                    {movieDetails.genres.map((item) => item.name).join(", ")}
                  </p>
                  <p className="text-gray-300 mb-4">
                    <strong>Release Year:</strong> {movieDetails.release_date}
                  </p>
                  <p className="text-gray-300 mb-6">
                    {movieDetails.description}
                  </p>
                  <button
                    onClick={addToMyList}
                    className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                  >
                    Add to My List
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
