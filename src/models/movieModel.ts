import { Schema, Document, model } from "mongoose";

interface IMovie extends Document {
  title: string;
  movieId: string;
  overview: string;
  releaseDate: String;
  genre: string[];
  posterPath: string;
  backdropPath: string;
  // Add other movie fields as needed
}

const movieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: false,
    },
    releaseDate: {
      type: String,
      required: false,
    },
    genre: {
      type: [String],
      required: false,
    },
    posterPath: {
      type: String,
      required: false,
    },
    backdropPath: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const MovieModel = model<IMovie>("Movie", movieSchema);

export default MovieModel;
