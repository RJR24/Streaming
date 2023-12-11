// models/MovieModel.ts
import { Schema, Document, model } from 'mongoose';

interface IMovie extends Document {
  title: string;
  overview: string;
  releaseDate: Date;
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
    overview: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    posterPath: {
      type: String,
      required: true,
    },
    backdropPath: {
      type: String,
      required: true,
    },
    // Add other movie fields as needed
  },
  { timestamps: true }
);

const MovieModel = model<IMovie>('Movie', movieSchema);

export default MovieModel;
