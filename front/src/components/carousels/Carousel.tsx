// Carousel.tsx
import React from 'react';
import Slider from 'react-slick';

interface CarouselProps {
  title: string;
  items: React.ReactNode[]; // You can adjust the type based on your actual movie item component
}

const Carousel: React.FC<CarouselProps> = ({ title, items }) => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    // Add other settings as needed
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="px-2">
            {item}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
