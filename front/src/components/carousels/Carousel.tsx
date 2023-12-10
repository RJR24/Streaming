import React from "react";
import Slider from "react-slick";
import Image from "next/image";

interface CarouselProps {
  title: string;
  items: { title: string; imageUrl: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ title, items = [] }) => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    // other settings as needed
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl text-neutral-200 ml-2 font-bold mb-4">{title}</h2>
      <Slider {...settings} className=" overflow-hidden">
        {items.map((movie, index) => (
          <div key={index} className="px-2">
            <Image
              src={movie.imageUrl}
              alt={movie.title}
              width={285}
              height={160}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
