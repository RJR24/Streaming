import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

interface MovieItem {
  title: string;
  imageUrl: string;
  id: string;
}

interface CarouselProps {
  title: string;
  items: MovieItem[];
}

const Carousel: React.FC<CarouselProps> = ({ title, items = [] }) => {
  const router = useRouter();

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    // other settings as needed
  };

  return (
    <div className="my-8 p-2">
      <h2 className="text-2xl text-neutral-200 ml-2 font-bold mb-4">{title}</h2>
      <Slider {...settings} className=" overflow-hidden">
        {items.map((movie, index) => (
          <Link href={`/movies/${movie.id}`} key={index} className=" mx-3 ">
            <Image
              src={movie.imageUrl}
              alt={movie.title}
              width={285}
              height={160}
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
