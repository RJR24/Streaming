export interface MovieDetails {
  id: string;
  title: string;
  genres: { name: string }[];
  release_date: string;
  description: string;
  backdrop_path: string;
  videos: { name: string; key: string; results: Video[] };
}

export interface Video {
  name: string;
  key: string;
}


import { Request } from 'express';

interface RequestWithFile extends Request {
  file: any; // Adjust the type according to your Multer configuration
}

export default RequestWithFile;
