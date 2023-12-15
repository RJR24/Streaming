import React from "react";
import Image from "next/image";

import Header from "../../components/header/Header";
import HeroSection from "../../components/hero/HeroSection";
import Carousel from "../../components/carousels/Carousel";
import MovieDataFetcher from "../../components/dataFetching/MovieDataFetcher";

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

  const trendingMovies = Array.from({ length: 10 }, (_, index) => ({
    title: `Trending Movie ${index}`,
    imageUrl: `/movies-cover-images/trending/MoviePoster-${index}.png`,
    width: 285,
    height: 160,
  }));

  const netflixOriginals = Array.from({ length: 10 }, (_, index) => ({
    title: `Netflix Original ${index}`,
    imageUrl: `/movies-cover-images/Netflix-original-content/MoviePoster-${index}.png`,
  }));

  const TodaysTop10ListInUK = Array.from({ length: 10 }, (_, index) => ({
    title: `Todays Top 10 List in UK ${index}`,
    imageUrl: `/movies-cover-images/MoviePoster-${index}.png`,
  }));

  const watchAgain = Array.from({ length: 10 }, (_, index) => ({
    title: `watch Again ${index}`,
    imageUrl: `/movies-cover-images/watch-Again/MoviePoster-${index}.png`,
  }));

  const MyList = Array.from({ length: 10 }, (_, index) => ({
    title: `My List ${index}`,
    imageUrl: `/movies-cover-images/MoviePoster-${index}.png`,
  }));

  return (
    <>
      <div className="container-all bg-neutral-900">
        <Header />
        <HeroSection />

        {/* Carousel for Movies */}

        <Carousel title="Popular On Netflix" items={PopularOnNetflix} />
        <Carousel title="Kaveh, keep watching" items={KavehKeepWatching} />
        {/* <Carousel title="Trending" items={trendingMovies} /> */}
        <Carousel title="Netflix Original Content" items={netflixOriginals} />
        {/* <Carousel
          title="Today's Top 10 List in UK"
          items={TodaysTop10ListInUK}
        /> */}
        <Carousel title="Watch Again" items={watchAgain} />

        <MovieDataFetcher />
        <Carousel title="My List" items={MyList} />
      </div>
    </>
  );
};

export default Home;
