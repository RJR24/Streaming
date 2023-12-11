import React from 'react';
import MovieDetailsFetcher from '../../components/dataFetching/MovieDetailsFetcher';
import Swal from 'sweetalert2';
import axios from 'axios';  // Import axios if not already imported
import Image from 'next/image';

const MovieDetailsPage = ({ movieId }) => {
  const addToMyList = async () => {
    let movieDetails;  // Declare movieDetails at the function level

    try {
      // Fetch movie details
      const response = await axios.get(`/api/movies/${movieId}`);
      movieDetails = response.data;

      // Add to My List
      await axios.post('/api/user/mylist', { movieId });

      // Show success message using Swal2
      Swal.fire({
        icon: 'success',
        title: 'Added to My List!',
        text: `${movieDetails.title} has been added to your My List.`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      // Handle error
      console.error('Error adding movie to My List:', error);
      // Show error message using Swal2
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <MovieDetailsFetcher movieId={movieId}>
      {(movieDetails) => (
        <div>
          {movieDetails ? (
            <>
              <div className="movie-details">
                <Image src={movieDetails.imageUrl} alt={movieDetails.title} />
                <div className="details">
                  <h1>{movieDetails.title}</h1>
                  <p>
                    <strong>Genre:</strong> {movieDetails.genre}
                  </p>
                  <p>
                    <strong>Release Year:</strong> {movieDetails.releaseYear}
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
      )}
    </MovieDetailsFetcher>
  );
};

export default MovieDetailsPage;
