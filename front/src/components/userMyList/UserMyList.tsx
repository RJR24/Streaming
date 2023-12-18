import React, { useEffect, useState } from 'react';
import Carousel from '../carousels/Carousel';

const UserMyList = () => {
  const [movieList, setMovieList] = useState([]);

  const fetchUserMovieList = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/mylist', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `Bearer ${localStorage.getItem('x-auth-token') || ''}`,
        },
      });
      const data = await response.json();
      setMovieList(data.myList);
    } catch (error) {
      console.error('Error fetching user movie list:', error);
    }
  };

  useEffect(() => {
    fetchUserMovieList();
  }, []);

  return (
    <div>
      <Carousel title="My List" items={movieList} />
    </div>
  );
};

export default UserMyList;
