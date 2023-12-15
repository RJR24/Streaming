import Image from "next/image";
import React from "react";

interface MovieProps {
  title: string;
  imageUrl: string;
}

const Movie: React.FC<MovieProps> = ({ title, imageUrl }) => {
  return (
    <div className="px-2">
      <Image src={imageUrl} alt={title} className="" />
     
    </div>
  );
};

export default Movie;
