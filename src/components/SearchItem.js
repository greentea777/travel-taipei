import React from "react";

const SearchItem = ({ search, setSearch, handleSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        role="searchbox"
        placeholder="Search Item"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => handleSearch()}>Search</button>
    </form>
  );
};

export default SearchItem;
