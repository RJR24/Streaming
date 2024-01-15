import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";

interface MovieItem {
  title: string;
  imageUrl: string;
  id: string;
  originalLanguage: string;
  voteAverage: number;
}

interface CarouselProps {
  title: string;
  items: MovieItem[];
}

const MovieCarousel: React.FC<CarouselProps> = ({ title, items = [] }) => {
  const [hoveredMovie, setHoveredMovie] = useState<MovieItem | null>(null);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const handleMouseEnter = (movie: MovieItem) => {
    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };
  
  return (
    <div className="my-8 p-2 relative">
      
      <h2 className="text-2xl text-neutral-200 ml-2 font-bold mb-4">{title}</h2>
      <Carousel responsive={responsive} infinite itemClass="carousel-item">
        {items.map((movie, index) => (
          <Link href={`/movies/${movie.id}`} key={index} className="mx-2 relative group">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(movie)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={movie.imageUrl}
                alt={movie.title}
                width={285}
                height={160}
                className="rounded-md transition-transform transform group-hover:scale-105"
              />
              {hoveredMovie && hoveredMovie.id === movie.id && (
                <div
                  id={`tooltip-${movie.id}`}
                  role="tooltip"
                  className="absolute opacity-70 z-10 inline-block p-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow tooltip dark:bg-gray-700"
                  style={{ top: "-10px" }} 
                >
                  <p>{movie.title}</p>
                  <p>{`Language: ${movie.originalLanguage}`}</p>
                  <p>{`Rating: ${movie.voteAverage}⭐`}</p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
