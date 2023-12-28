import React from 'react';
import { useRouter } from 'next/router';
import CategoryDataFetcher from '../../../components/dataFetching/CategoryDataFetcher';

const CategoryDetailsPage = () => {
  const router = useRouter();
  const { category } = router.query;
  if (!category) {
    // Handle loading or error state
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{category} Details</h2>
      <CategoryDataFetcher
        categoryUrl={`https://api.example.com/${category}`}
        transformFunction={(movie) => ({
          title: movie.title,
          imageUrl: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
          id: movie.id,
        })}
      >
        {(data) => (
          <table className="w-full whitespace-nowrap">
            <thead className="bg-black/60">
              <tr>
                <th className="text-left py-3 px-2 rounded-l-lg">Image</th>
                <th className="text-left py-3 px-2">Title</th>
                <th className="text-left py-3 px-2">ID</th>
                <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((movie) => (
                <tr
                  key={movie.id}
                  className="border-b hover:bg-white/10 border-gray-700"
                >
                  <td className="py-3 px-2 font-bold">
                    <div className="inline-flex space-x-3 items-center">
                      <span>
                        <img
                          className="rounded-full w-10 h-10"
                          src={movie.imageUrl}
                          alt={`Movie ${movie.title} Poster`}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">{movie.title}</td>
                  <td className="py-3 px-2">{movie.id}</td>
                  <td className="py-3 px-2">
                    <div className="inline-flex items-center space-x-3">
                      <a href="" title="Edit" className="hover:text-white">
                        {/* Edit icon */}
                      </a>
                      <a href="" title="Remove" className="hover:text-white">
                        {/* Remove icon */}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CategoryDataFetcher>
    </div>
  );
};

export default CategoryDetailsPage;
