import { useState, useEffect } from "react";
import ItemList from "./components/ItemList";
import SearchItem from "./components/SearchItem";
import db from "./database/db.json";

function App() {
  const [travelData, setTravelData] = useState(db);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dataList = travelData.data;
  return (
    <div className="App">
      <SearchItem search={search} setSearch={setSearch} />
      <ItemList travelData={dataList} />
    </div>
  );
}

export default App;
