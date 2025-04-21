import React from "react";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <div className="relative flex justify-center top-6">
        <input
          type="text"
          placeholder="SEARCH MOVIES"
          className="absolute shrink-0 bg-white text-gray-700 outline-none
           rounded-md h-8 w-64 px-3 py-3 focus:ring-1 focus:ring-blue-400 
           cursor-pointer bg-[url('/search.png')] bg-no-repeat bg-[length:16px_16px] bg-right pr-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBox;
