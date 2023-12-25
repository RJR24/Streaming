// MovieDetailsPage.tsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";
import MovieDetailsComponent from "./MovieDetailsComponent";
import TrailerComponent from "./TrailerComponent";
import AddRemoveButton from "./AddRemoveButton";
import { fetchMovieDetails, checkMyListStatus } from "./ApiService";
import { MovieDetails } from "../../../types";

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

  useEffect(() => {
    const { movieId } = router.query;
    if (movieId && typeof movieId === "string") {
      setId(movieId);
    }
  }, [router.query]);

  useEffect(() => {
    if (id) {
      checkMyListStatus(id, token || "").then((isInList) => {
        setIsInMyList(isInList);
        setInitialCheckComplete(true);
      });
    }
  }, [id, token]);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id).then((data) => setMovieDetails(data));
    }
  }, [id]);

  const toggleMyList = async () => {
    try {
      if (id) {
        const endpoint = isInMyList ? "remove" : "add";
        await axios.post(
          `http://localhost:8000/api/user/mylist/${endpoint}/${id}`,
          {},
          {
            headers: {
              "x-auth-token": `Bearer ${token || ""}`,
            },
          }
        );

        const actionMessage = isInMyList
          ? "Removed from My List!"
          : "Added to My List!";
        Swal.fire({
          icon: "success",
          title: actionMessage,
          text: `${movieDetails?.title} has been ${
            isInMyList ? "removed from" : "added to"
          } your My List.`,
          showConfirmButton: true,
          timer: 3000,
        });

        setIsInMyList(!isInMyList);
      }
    } catch (error) {
      console.error("Error updating My List:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto p-8">
          {initialCheckComplete ? (
            <>
              <TrailerComponent videos={movieDetails?.videos?.results} />

              <MovieDetailsComponent movieDetails={movieDetails} />

              <AddRemoveButton
                isInMyList={isInMyList}
                onToggle={toggleMyList}
              />
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
