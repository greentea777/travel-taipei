import { useState, useEffect } from "react";
import ItemList from "./components/ItemList";
import SearchItem from "./components/SearchItem";
import db from "./database/db.json";
import Header from "./components/Header";

function App() {
  const [travelData, setTravelData] = useState(db.data);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(db.data);

  // Filter the search results 搜尋時即時顯示搜尋結果

  // useEffect(() => {
  //   const filter = travelData.filter(
  //     (item) => item.name.includes(search) || item.distric.includes(search)
  //   );

  //   setSearchResults(filter);
  // }, [search]);

  // Click search button then filtering the search keyword
  const handleSearch = () => {
    const filter = travelData.filter(
      (item) => item.name.includes(search) || item.distric.includes(search)
    );

    setSearchResults(filter);

    setSearch("");
  };

  return (
    <div className="App">
      <Header />
      <SearchItem
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <ItemList travelData={searchResults} />
    </div>
  );
}

export default App;
