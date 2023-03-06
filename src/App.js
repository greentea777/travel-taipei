import { useEffect, useState } from "react";
import ItemList from "./components/ItemList";
import db from "./database/db.json";
import { Route, Routes } from "react-router-dom";
import SingleItem from "./components/SingleItem";
import SharedLayout from "./components/SharedLayout";
import LogPage from "./components/LogPage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import Favourite from "./components/Favourite";
import { database } from "./config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import ReactPaginate from "react-paginate";
import ProtectedRoute from "./components/ProtectedRoute";

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

  const resetSearch = () => {
    const filter = travelData.filter(
      (item) => item.name.includes("") || item.distric.includes("")
    );
    setSearchResults(filter);

    setSearch("");
  };

  const handleCategorySearch = (category) => {
    const categoryFilter = travelData.filter((item) =>
      item.category.find((item) => item.name.includes(category))
    );
    setSearchResults(categoryFilter);
    window.scrollTo(0, 0);
  };

  // const category = travelData.map((item) => item.category);
  // const filter = category.map((i) => i.filter((it) => it.id == 15));
  // console.log(filter);

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      });
    };

    checkUser();

    return () => {
      checkUser();
    };
  }, [search]);

  const [commentList, setCommentList] = useState([]);
  const [rerender, setRerender] = useState(false);

  const commentCollectionRef = collection(database, "comments");

  useEffect(() => {
    const getComment = async () => {
      const data = await getDocs(commentCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCommentList(filterData);
    };

    getComment();

    return () => getComment();
  }, [rerender]);

  const likeCollectionRef = collection(database, "likeList");
  const [likeList, setLikeList] = useState([]);
  useEffect(() => {
    const getLikeList = async () => {
      const data = await getDocs(likeCollectionRef);
      const filterLikeListData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLikeList(filterLikeListData);
    };

    getLikeList();
    return () => getLikeList();
  }, [rerender]);

  return (
    <Routes>
      <Route
        path="/"
        element={<SharedLayout authUser={authUser} resetSearch={resetSearch} />}
      >
        <Route
          index
          element={
            <ItemList
              travelData={searchResults}
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              handleCategorySearch={handleCategorySearch}
              likeList={likeList}
              setRerender={setRerender}
              db={db}
            />
          }
        />

        <Route
          path="attraction/:itemid"
          element={
            <SingleItem
              travelData={travelData}
              commentList={commentList}
              setRerender={setRerender}
              authUser={authUser}
            />
          }
        />

        <Route
          path="favourite"
          element={
            <ProtectedRoute authUser={authUser}>
              <Favourite
                travelData={travelData}
                handleCategorySearch={handleCategorySearch}
                likeList={likeList}
                setRerender={setRerender}
                auth={auth}
              />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
