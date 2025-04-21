import { useState, useEffect } from "react";
import Card from "./Card";
import Navigation from "./Navigation";
import { debounce } from "lodash";
const Home = () => {
  const [cardWidth, setCardWidth] = useState(460);
  const cardInRow = 3;
  const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardInRow);
  const [movies, setMovies] = useState([]);
  const [genreMap, setGenreMap] = useState({});
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [group, setGroup] = useState("upcoming");
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getMovies = debounce(async (query = "") => {
      const url = query
        ? `${baseUrl}/search/movie?query=${encodeURIComponent(query)}`
        : `${baseUrl}/movie/${group}?language=en-US&page=${page}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovies(result.results);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }, 500);
    getMovies(searchTerm);
  }, [page, group, searchTerm]);

  useEffect(() => {
    const fetchGenre = async () => {
      const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const genreObj = {};

        result.genres.forEach((genre) => {
          genreObj[genre.id] = genre.name;
        });

        setGenreMap(genreObj);
      } catch (error) {
        console.error("failed to fetch genres:", error);
      }
    };
    fetchGenre();
  }, []);

  return (
    <>
      <Navigation
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        page={page}
        setPage={setPage}
        setGroup={setGroup}
      />
      <div
        className="flex justify-center items-center"
        style={{ width: wrapperWidth }}
      >
        <div className="flex flex-wrap">
          {movies.map((movie, i) => (
            <div key={movie.id}>
              <Card movie={movie} genreMap={genreMap} cardWidth={cardWidth} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
