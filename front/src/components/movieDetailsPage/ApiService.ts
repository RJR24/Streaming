import axios from "axios";

import { MovieDetails } from "../../../types";
const api_key = process.env.NEXT_PUBLIC__API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchMovieDetails = async (
  id: string
): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get<MovieDetails>(`${API_URL}/movie/${id}`, {
      params: {
        api_key,
        append_to_response: "videos",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export const checkMyListStatus = async (
  id: string,
  token: string
): Promise<boolean> => {
  try {
    const isInMyListResponse = await axios.get<boolean>(
      `http://localhost:8000/api/user/mylist/${id}`,
      {
        headers: {
          "x-auth-token": `Bearer ${token || ""}`,
        },
      }
    );
    return isInMyListResponse.data;
  } catch (error) {
    console.error("Error checking My List status:", error);
    return false;
  }
};
