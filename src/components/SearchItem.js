import React from "react";

const SearchItem = ({ search, setSearch, handleSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label className="offscreen" htmlFor="search">
        Search
      </label>
      <input
        type="text"
        id="search"
        role="searchbox"
        placeholder="Search Attraction"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="searchBtn" onClick={() => handleSearch()}>
        Search
      </button>
    </form>
  );
};

export default SearchItem;
