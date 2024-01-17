import { useState } from "react";
import Link from "next/link";
import CategoryDataFetcher from "../../dataFetching/CategoryDataFetcher";
import AddCategoryModal from "../../AddCategoryModal";
import RemoveCategoryModal from "../../RemoveCategoryModal";
import Image from "next/image";

const AdminMainDashboardContent = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenRemoveModal = () => {
    setIsRemoveModalOpen(true);
  };

  const handleCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const tmdbUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
      <div id="7DaysStatistics">
        <h1 className="font-bold py-4 uppercase">Last 7days Statistics</h1>
        <div
          id="stats"
          className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="bg-black/60 to-white/5 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-indigo-300 text-sm font-medium uppercase leading-4">
                  number of users
                </p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>+28</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-black/60 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 text-white"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="12" y1="12" x2="12" y2="7" />
                  <line x1="12" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <div>
                <p className="text-teal-300 text-sm font-medium uppercase leading-4">
                  Time spent
                </p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>2,873.88</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-black/60 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-blue-300 text-sm font-medium uppercase leading-4">
                  Invoices
                </p>
                <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                  <span>+79</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="Categories">
        <h1 className="font-bold py-4 uppercase">Categories</h1>
        <div
          id="categoriesStats"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <CategoryDataFetcher
            categoryUrl={`${tmdbUrl}/movie/popular?api_key=${apiKey}`}
            transformFunction={(movie) => ({
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
              id: movie.id,
            })}
          >
            {(data) => (
              <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="text-3xl p-4">🤩</div>
                  <div className="p-2">
                    <p className="text-xl font-bold">Popular on Netflix</p>
                    <p className="text-gray-500 font-medium">Amber Gates</p>
                    <p className="text-gray-500 text-sm">24 Nov 2022</p>
                  </div>
                </div>
                <div className="border-t border-white/5 p-4">
                  <Link
                    href="/admin/category/popular"
                  >
                    <div className="inline-flex space-x-2 items-center text-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      <span>See more</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </CategoryDataFetcher>

          <CategoryDataFetcher
            categoryUrl={`${tmdbUrl}/trending/all/day?api_key=${apiKey}`}
            transformFunction={(movie) => ({
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
              id: movie.id,
            })}
          >
            {(data) => (
              <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="text-3xl p-4">📺</div>
                  <div className="p-2">
                    <p className="text-xl font-bold">Tv Show on Netflix</p>
                    <p className="text-gray-500 font-medium">Maia Kipper</p>
                    <p className="text-gray-500 text-sm">23 Nov 2022</p>
                  </div>
                </div>
                <div className="border-t border-white/5 p-4">
                  <Link
                    href="/admin/category/tvShow"
                  >
                    <div className="inline-flex space-x-2 items-center text-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      <span>See more</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </CategoryDataFetcher>

          <CategoryDataFetcher
            categoryUrl={`${tmdbUrl}/movie/popular?api_key=${apiKey}`}
            transformFunction={(movie) => ({
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
              id: movie.id,
            })}
          >
            {(data) => (
              <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="text-3xl p-4">📽</div>
                  <div className="p-2">
                    <p className="text-xl font-bold">Original Content</p>
                    <p className="text-gray-500 font-medium">Oprah Milles</p>
                    <p className="text-gray-500 text-sm">23 Nov 2022</p>
                  </div>
                </div>
                <div className="border-t border-white/5 p-4">
                  <Link
                    href="/admin/category/original"
                  >
                    <div className="inline-flex space-x-2 items-center text-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      <span>See more</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </CategoryDataFetcher>

          <CategoryDataFetcher
            categoryUrl={`${tmdbUrl}/movie/upcoming?api_key=${apiKey}`}
            transformFunction={(movie) => ({
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
              id: movie.id,
            })}
          >
            {(data) => (
              <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="text-3xl p-4">⏳</div>
                  <div className="p-2">
                    <p className="text-xl font-bold">Upcoming Movies</p>
                    <p className="text-gray-500 font-medium">Jonny Nite</p>
                    <p className="text-gray-500 text-sm">23 Nov 2022</p>
                  </div>
                </div>
                <div className="border-t border-white/5 p-4">
                  <Link
                    href="/admin/category/upcomingMovies"
                  >
                    <div className="inline-flex space-x-2 items-center text-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      <span>See more</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </CategoryDataFetcher>

          <CategoryDataFetcher
            categoryUrl={`${tmdbUrl}/movie/top_rated?api_key=${apiKey}`}
            transformFunction={(movie) => ({
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
              id: movie.id,
            })}
          >
            {(data) => (
              <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="text-3xl p-4">🥇</div>
                  <div className="p-2">
                    <p className="text-xl font-bold">Todays Top10</p>
                    <p className="text-gray-500 font-medium">Megane Baile</p>
                    <p className="text-gray-500 text-sm">22 Nov 2022</p>
                  </div>
                </div>
                <div className="border-t border-white/5 p-4">
                  <Link
                    href="/admin/category/top10MoviesUK"
                  >
                    <div className="inline-flex space-x-2 items-center text-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      <span>See more</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </CategoryDataFetcher>

          <CategoryDataFetcher
            categoryUrl={`${tmdbUrl}/movie/top_rated?api_key=${apiKey}`}
            transformFunction={(movie) => ({
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
              id: movie.id,
            })}
          >
            {(data) => (
              <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="text-3xl p-4">🚀</div>
                  <div className="p-2">
                    <p className="text-xl font-bold">Trending</p>
                    <p className="text-gray-500 font-medium">Tony Ankel</p>
                    <p className="text-gray-500 text-sm">22 Nov 2022</p>
                  </div>
                </div>
                <div className="border-t border-white/5 p-4">
                  <Link
                    href="/admin/category/trending"
                  >
                    <div className="inline-flex space-x-2 items-center text-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      <span>See more</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </CategoryDataFetcher>

          <div className="new-category bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
            <div className="flex flex-row items-center">
              <div className="text-3xl p-4">➕</div>
              <div className="p-2">
                <p className="text-xl font-bold">Add a new category</p>
                <p className="text-gray-500 font-medium">Jonny Nite</p>
                <p className="text-gray-500 text-sm">23 Nov 2022</p>
              </div>
            </div>
            <div
              className="border-t cursor-pointer border-white/5 p-4"
              onClick={handleOpenAddModal}
            >
              <p
                className="inline-flex space-x-2 items-center text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span>Click to add</span>
              </p>
            </div>
            {/* Render the CategoryModal */}
            {isAddModalOpen && (
              <AddCategoryModal onClose={handleCloseAddModal} />
            )}
          </div>

          <div className="new-category bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
            <div className="flex flex-row items-center">
              <div className="text-3xl p-4">➖</div>
              <div className="p-2">
                <p className="text-xl font-bold">Remove category</p>
                <p className="text-gray-500 font-medium">Jonny Nite</p>
                <p className="text-gray-500 text-sm">23 Nov 2022</p>
              </div>
            </div>
            <div
              className="border-t cursor-pointer border-white/5 p-4"
              onClick={handleOpenRemoveModal}
            >
              <p
                className="inline-flex space-x-2 items-center text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span>Click to remove</span>
              </p>
            </div>
            {/* Render the CategoryModal */}
            {isRemoveModalOpen && (
              <RemoveCategoryModal onClose={handleCloseRemoveModal} />
            )}
          </div>
        </div>
        <div id="last-users">
          <h1 className="font-bold py-4 uppercase">Last 24h users</h1>
          <div className="overflow-x-scroll">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-black/60">
                <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                <th className="text-left py-3 px-2">Email</th>
                <th className="text-left py-3 px-2">Group</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
              </thead>
              <tbody>
                <tr
                  key={1}
                  className="border-b hover:bg-white/10 border-gray-700"
                >
                  <td className="py-3 px-2 font-bold">
                    <div className="inline-flex space-x-3 items-center">
                      <span>
                        <Image
                          className="rounded-full "
                          src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"
                          alt="user profile image"
                          width={32}
                          height={32}
                          
                        ></Image>
                      </span>
                      <span>Thai Mei</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">thai.mei@abc.com</td>
                  <td className="py-3 px-2">User</td>
                  <td className="py-3 px-2">Approved</td>
                  <td className="py-3 px-2">
                    <div className="inline-flex items-center space-x-3">
                      <p title="Edit" className="cursor-pointer hover:text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </p>

                      <p
                        title="Suspend user"
                        className="cursor-pointer hover:text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr
                  key={2}
                  className="border-b hover:bg-white/10 border-gray-700"
                >
                  <td className="py-3 px-2 font-bold">
                    <div className="inline-flex space-x-3 items-center">
                      <span>
                        <Image
                          className="rounded-full "
                          src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"
                          alt="user profile image"
                          width={32}
                          height={32}
                        ></Image>
                      </span>
                      <span>Thai Mei</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">thai.mei@abc.com</td>
                  <td className="py-3 px-2">User</td>
                  <td className="py-3 px-2">Approved</td>
                  <td className="py-3 px-2">
                    <div className="inline-flex items-center space-x-3">
                      <p title="Edit" className="cursor-pointer hover:text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </p>

                      <p
                        title="Suspend user"
                        className="cursor-pointer hover:text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr
                  key={3}
                  className="border-b hover:bg-white/10 border-gray-700"
                >
                  <td className="py-3 px-2 font-bold">
                    <div className="inline-flex space-x-3 items-center">
                      <span>
                        <Image
                          className="rounded-full "
                          src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"
                          alt="user profile image"
                          width={32}
                          height={32}
                        ></Image>
                      </span>
                      <span>Thai Mei</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">thai.mei@abc.com</td>
                  <td className="py-3 px-2">User</td>
                  <td className="py-3 px-2">Approved</td>
                  <td className="py-3 px-2">
                    <div className="inline-flex items-center space-x-3">
                      <p title="Edit" className="cursor-pointer hover:text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </p>

                      <p
                        title="Suspend user"
                        className="cursor-pointer hover:text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr
                  key={4}
                  className="border-b hover:bg-white/10 border-gray-800"
                >
                  <td className="py-3 px-2 font-bold">
                    <div className="inline-flex space-x-3 items-center">
                      <span>
                        <Image
                          className="rounded-full "
                          src="https://images.generated.photos/f_xU7q780YXiKG7IwKVV05eU6Sj2nIodEkN1S8GyM2M/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDk2MTc4LmpwZw.jpg"
                          alt="user profile image"
                          width={32}
                          height={32}
                        ></Image>
                      </span>
                      <span>Mark Spike</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">mark.spike@abc.com</td>
                  <td className="py-3 px-2">Administrator</td>
                  <td className="py-3 px-2">Approved</td>
                  <td className="py-3 px-2">
                    <div className="inline-flex items-center space-x-3">
                      <p title="Edit" className="cursor-pointer hover:text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </p>

                      <p
                        title="Suspend user"
                        className="cursor-pointer hover:text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMainDashboardContent;
