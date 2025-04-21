import { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ cardWidth, movie, genreMap }) => {
  const {
    title,
    genre_ids,
    original_language,
    overview,
    release_date,
    vote_average,
    poster_path,
  } = movie;
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div
      style={{ width: cardWidth }}
      className="relative h-[650px] flex justify-center items-center shrink-0 p-2 group"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showDesc ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setShowDesc(!showDesc)}
        className="absolute  text-white w-[75%] h-[95%] m-auto rounded-lg bg-black/50 flex flex-col justify-center gap-y-2 p-10 backdrop-blur-2xl cursor-pointer"
      >
        <h1 className="text-4xl">{title}</h1>
        <div className="flex gap-x-2 items-center flex-wrap">
          <span className="text-lg">Genre:</span>
          {genreMap ? (
            genreMap &&
            genre_ids?.map((id, i) => (
              <span key={i} className="text-red-500">
                {genreMap[id] || "Unknown"}
              </span>
            ))
          ) : (
            <span className="text-red-500">'Unknown'</span>
          )}
        </div>
        <span className="flex gap-x-2">
          Original Language:
          <span className="mr-2 uppercase">
            {original_language ? original_language : "N/A"}
          </span>
        </span>
        <span className="flex gap-x-2">
          Release Date:{" "}
          <span className="mr-2 text-yellow-400">
            {release_date ? release_date : "N/A"}
          </span>
        </span>
        <p className="flex flex-col gap-y-1">
          <span className="text-red-500">Summary:</span>
          <span className="first-letter:pl-2 line-clamp-10">
            {overview ? overview : "No Overview"}
          </span>
        </p>
        <span className="flex h-5 w-5 gap-x-2">
          <img src="./star.png" alt="rating" />
          <span className="mr-2">
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </span>
        </span>
      </motion.div>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/original${poster_path}`
            : "/no-movie.png"
        }
        alt="Movie Img"
        className="-z-10 absolute w-[97%] h-[97%] object-cover rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>
  );
};

export default Card;
