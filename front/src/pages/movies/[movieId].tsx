import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Image from "next/image";
import YouTube from "react-youtube";
import { useRouter } from "next/router";

import {
  MY_LIST_ADD_ITEM,
  MY_LIST_REMOVE_ITEM,
  MY_LIST_CHECK_ITEM,
} from "../../constants/apiEndpoints";

interface Video {
  key: string;
  name: string;
  }
  interface MovieDetails {
    id: string;
    title: string;
    genres: { name: string }[];
    release_date: string;
    description: string;
    backdrop_path: string;
    originalLanguage: string;
    voteAverage: number;
    videos: { name: string; key: string; results: Video[] };
  }

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MovieDetailsPage: React.FC = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isInMyList, setIsInMyList] = useState(false);
  const [id, setId] = useState<string | undefined>();
  const [token, setToken] = useState<string | undefined>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("x-auth-token") || undefined;
    }
    return undefined;
  });
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  const router = useRouter();

  const toggleMyList = async () => {
    try {
      // Check if the movie is already in the user's My List
      if (isInMyList) {
        // Remove from My List
        await axios.post(
          MY_LIST_REMOVE_ITEM(id || ""),
          {},
          {
            headers: {
              "x-auth-token": `Bearer ${token}`,
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Removed from My List!",
          text: `${movieDetails?.title} has been removed from your My List.`,
          showConfirmButton: true,
          timer: 1500,
        });
      } else {
        // Add to My List
        await axios.post(
          MY_LIST_ADD_ITEM(id || ""),
          {
            id: movieDetails?.id,
            title: movieDetails?.title,
            originalLanguage: movieDetails?.originalLanguage,
            rating: movieDetails?.voteAverage,
            backdrop_path: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
          },
          {
            headers: {
              "x-auth-token": `Bearer ${token || ""}`,
            },
          }
        );
        
        Swal.fire({
          icon: "success",
          title: "Added to My List!",
          text: `${movieDetails?.title} has been added to your My List.`,
          showConfirmButton: true,
          timer: 1500,
        });
      }

      // Toggle the state
      setIsInMyList(!isInMyList);
    } catch (error) {
      // Handle error
      console.error("Error updating My List:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  useEffect(() => {
    const { movieId } = router.query;
    if (movieId && typeof movieId === "string") {
      setId(movieId);
    }
  }, [router.query]);

  useEffect(() => {
    // Check if the movie is already in the user's My List
    const checkMyListStatus = async () => {
      try {
        const isInMyListResponse = await axios.get(
          MY_LIST_CHECK_ITEM(id || ""),
          {
            headers: {
              "x-auth-token": `Bearer ${token || ""}`,
            },
          }
        );
        setIsInMyList(isInMyListResponse.data.isInMyList);
        setInitialCheckComplete(true);
      } catch (error) {
        console.error("Error checking My List status:", error);
      }
    };

    if (id) {
      checkMyListStatus();
    }
  }, [id, token]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const response = await axios.get<MovieDetails>(
            `${API_URL}/movie/${id}`,
            {
              params: {
                api_key: process.env.NEXT_PUBLIC_API_KEY,
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
          {initialCheckComplete ? (
            <>
              {/* Render the component content */}
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
                {movieDetails?.videos?.results?.length &&
                movieDetails?.videos?.results.length > 0 ? (
                  <div className="w-full md:w-1/2 lg:w-2/3 mx-auto">
                    {/* Filter videos to get the trailer with name 'Official Trailer' */}
                    {(() => {
                      const trailerVideo = movieDetails?.videos?.results?.find(
                        (video) => video.name === "Official Trailer"
                      );
                      return trailerVideo ? (
                        <YouTube
                          videoId={trailerVideo.key}
                          opts={{ width: "100%", height: "500px" }}
                        />
                      ) : (
                        <YouTube
                          videoId={movieDetails?.videos?.results?.[0]?.key}
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
                      src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`}
                      alt={movieDetails?.title || "Movie Poster"}
                    />
                  </div>
                )}

                <div className="w-full md:w-1/2 lg:w-1/3 p-4 mx-auto flex flex-col justify-center items-center">
                  <h1 className=" d-flex text-center text-3xl font-bold mb-4">
                    {movieDetails?.title}
                  </h1>
                  <p className="text-gray-300 mb-4">
                    <strong>Genre:</strong>{" "}
                    {movieDetails?.genres.map((item) => item.name).join(", ")}
                  </p>
                  <p className="text-gray-300 mb-4">
                    <strong>Release Year:</strong> {movieDetails?.release_date}
                  </p>
                  <p className="text-gray-300 mb-6">
                    {movieDetails?.description}
                  </p>
                  <button
                    onClick={toggleMyList}
                    className={`${
                      isInMyList ? "bg-red-500" : "bg-blue-500"
                    } text-white px-4 py-2 rounded focus:outline-none`}
                  >
                    {isInMyList ? "Remove from My List" : "Add to My List"}
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