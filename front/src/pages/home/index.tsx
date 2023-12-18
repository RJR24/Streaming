import React, { useEffect } from "react";
import Image from "next/image";

import Header from "../../components/header/Header";
import HeroSection from "../../components/hero/HeroSection";
import Carousel from "../../components/carousels/Carousel";
import MovieDataFetcher from "../../components/dataFetching/MovieDataFetcher";
import UserMyList from "../../components/userMyList/UserMyList";
import TrendingMovies from "../../components/movieCategoriesCarousels/TrendingMovies";
import Top10MoviesUK from "../../components/movieCategoriesCarousels/TopTenUk";
import Upcoming from "../../components/movieCategoriesCarousels/UpcomingMovies";
import PopularMovies from "../../components/movieCategoriesCarousels/TrendingMovies";
import TvShows from "../../components/movieCategoriesCarousels/TvShows";

const Home = () => {
  // data for the carousel items
  const PopularOnNetflix = Array.from({ length: 10 }, (_, index) => ({
    title: `Popular On Netflix ${index}`,
    imageUrl: `/movies-cover-images/popular-on-netflix/MoviePoster-${index}.png`,
  }));

  const KavehKeepWatching = Array.from({ length: 10 }, (_, index) => ({
    title: `Kaveh, Keep Watching ${index}`,
    imageUrl: `/movies-cover-images/Kaveh-keep-watching/MoviePoster-${index}.png`,
  }));

  const netflixOriginals = Array.from({ length: 10 }, (_, index) => ({
    title: `Netflix Original ${index}`,
    imageUrl: `/movies-cover-images/Netflix-original-content/MoviePoster-${index}.png`,
  }));

  const watchAgain = Array.from({ length: 10 }, (_, index) => ({
    title: `watch Again ${index}`,
    imageUrl: `/movies-cover-images/watch-Again/MoviePoster-${index}.png`,
  }));

  useEffect(() => {});

  return (
    <>
      <div className="container-all bg-neutral-900">
        <Header />
        <HeroSection />

        {/* Carousel for Movies */}

        <PopularMovies />
        <Carousel title="Kaveh, keep watching" items={KavehKeepWatching} />
        <TvShows />
        <Carousel title="Netflix Original Content" items={netflixOriginals} />

        <UserMyList />
        <Upcoming />
        <Top10MoviesUK />
      </div>
    </>
  );
};

export default Home;
