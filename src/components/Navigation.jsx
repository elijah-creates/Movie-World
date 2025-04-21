import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { motion } from "framer-motion";
import SearchBox from "./SearchBox";

const Navigation = ({ searchTerm, setSearchTerm, setGroup, setPage, page }) => {
  const isSearching = searchTerm.trim() !== "";
  return (
    <div className="relative z-10">
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {!isSearching && (
        <div className="bottom-5 left-5 flex items-center text-2xl bg-yellow-500/50 gap-x-2 rounded-full px-2 fixed">
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.3 }}
            onClick={() => page != 1 && setPage((page) => page - 1)}
            className="cursor-pointer"
          >
            <IoMdArrowDropleftCircle />
          </motion.span>
          <p className="text-xl select-none">{page}</p>
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.3 }}
            onClick={() => setPage((page) => page + 1)}
            className="cursor-pointer"
          >
            <IoMdArrowDroprightCircle />
          </motion.span>
        </div>
      )}
      {!isSearching && (
        <select
          defaultValue={"popular"}
          onChange={(e) => {
            setGroup(e.target.value);
            setPage(1);
          }}
          className="fixed top-5 left-5 bg-gray-200/90 text-gray-700 outline-none rounded-md uppercase tracking-wide p-1 cursor-pointer hover:bg-gray-200"
        >
          <option value="top_rated">Top Rated</option>
          <option value="popular">Popular</option>
          <option value="upcoming">Upcoming</option>
          <option value="now_playing">Now</option>
        </select>
      )}
    </div>
  );
};

export default Navigation;
