import React, { useEffect } from "react";

import Header from "../../components/navbar/Navbar";
import HeroSection from "../../components/hero/HeroSection";
import Carousel from "../../components/carousels/Carousel";
import UserMyList from "../../components/userMyList/UserMyList";
import tvShow from "../../components/movieCategoriesCarousels/PopularMovies";
import Top10MoviesUK from "../../components/movieCategoriesCarousels/TopTenUk";
import Upcoming from "../../components/movieCategoriesCarousels/UpcomingMovies";
import PopularMovies from "../../components/movieCategoriesCarousels/PopularMovies";
import TvShows from "../../components/movieCategoriesCarousels/TvShows";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const KavehKeepWatching = Array.from({ length: 10 }, (_, index) => ({
    title: `Kaveh, Keep Watching ${index}`,
    imageUrl: `/movies-cover-images/Kaveh-keep-watching/MoviePoster-${index}.png`,
  }));

  const netflixOriginals = Array.from({ length: 10 }, (_, index) => ({
    title: `Netflix Original ${index}`,
    imageUrl: `/movies-cover-images/Netflix-original-content/MoviePoster-${index}.png`,
  }));

  useEffect(() => {});

  return (
    <>
      <div className="container-all bg-neutral-900">
        <Header />
        <HeroSection />

        <PopularMovies />
        <UserMyList />

        <TvShows />

        <Top10MoviesUK />
        <Upcoming />


        <Carousel title="Kaveh, keep watching" items={KavehKeepWatching} />
        <Carousel title="Netflix Original Content" items={netflixOriginals} />

        <Footer />

      </div>
    </>
  );
};

export default Home;
