import React, { useEffect, useState } from "react";
import MovieDetailsFetcher from "../../components/dataFetching/MovieDetailsFetcher";
import Swal from "sweetalert2";
import axios from "axios"; // Import axios if not already imported
import Image from "next/image";
import { useRouter } from "next/router";

const MovieDetailsPage = ({}) => {
  const addToMyList = async () => {
    let movieDetails; // Declare movieDetails at the function level

    try {
      // Fetch movie details
      const response = await axios.get(`/api/movies/${movieId}`);
      movieDetails = response.data;

      // Add to My List
      await axios.post("/api/user/mylist", { movieId });

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

  const [movieDetails, setMovieDetails] = useState(null);
  const router = useRouter();
  const [id, setId] = useState<string | undefined>();

  useEffect(() => {
    // Fetch movie details when the component mounts
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=7b269e05a4ae4f5629b1515cafb76014`
          );
          setMovieDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const { movieId } = router.query;
    if (movieId && typeof movieId === "string") {
      setId(movieId);
    }
  }, [router.query]);

  return (
    <>
      <div>
        {movieDetails ? (
          <>
            <div className="movie-details">
              <Image
                width="300"
                height="300"
                src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
                alt={movieDetails.title}
              />
              <div className="details">
                <h1>{movieDetails.title}</h1>
                <p>
                  <strong>Genre:</strong>{" "}
                  {movieDetails.genres.map((item) => item.name)}
                </p>
                <p>
                  <strong>Release Year:</strong> {movieDetails.release_date}
                </p>
                <p>{movieDetails.description}</p>
                <button onClick={addToMyList}>Add to My List</button>
              </div>
            </div>
            <style jsx>{`
              .movie-details {
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
              .details {
                max-width: 600px;
              }
              img {
                max-width: 300px;
                max-height: 450px;
              }
            `}</style>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default MovieDetailsPage;
