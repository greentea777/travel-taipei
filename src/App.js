import { useState } from "react";
import ItemList from "./components/ItemList";
import SearchItem from "./components/SearchItem";
import db from "./database/db.json";
import Header from "./components/Header";
import LogPage from "./components/LogPage";
import { Route, Routes } from "react-router-dom";
import SingleItem from "./components/SingleItem";

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
    <Routes>
      <Route path="/">
        <Route index element={<ItemList travelData={travelData} />} />
        <Route
          path="attraction/:itemid"
          element={<SingleItem travelData={travelData} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
