import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ItemList from "./ItemList";

import Item from "./Item";

const Page = ({
  travelData,
  search,
  setSearch,
  handleSearch,
  handleCategorySearch,
  likeList,
  setRerender,
  db,
  searchResults,
}) => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  let num = searchParams.get("page");

  console.log(num);
  const itemsPerPage = 15;
  //   const [itemOffset, setItemOffset] = useState(0);
  const endOffset = (Number(num) - 1) * 15 + itemsPerPage;
  let currentItems = travelData.slice((num - 1) * 15, endOffset);
  const pageCount = Math.ceil(travelData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % travelData.length;
    setSearchParams({ page: newOffset / 15 + 1 });
    window.scrollTo(0, 0);
  };

  console.log(num);
  if (currentItems.length === 0) {
    currentItems = travelData.slice(0, 15);
  }

  if (num === null) {
    num = 1;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  return (
    <>
      {currentItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          handleCategorySearch={handleCategorySearch}
          likeList={likeList}
          setRerender={setRerender}
        />
      ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        // Setting calss name
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        breakLinkClassName="page-num"
        activeLinkClassName="active"
        hrefBuilder={(page, pageCount, selected) => {
          return page >= 1 && page <= pageCount ? `/page/${page}` : "#";
        }}
        hrefAllControls
        forcePage={Number(num) - 1}
      />

      {/* style={{ margin: "80px" }}><h1>{page}</h1>{" "} */}
      {/* <ItemList
        travelData={searchResults}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleCategorySearch={handleCategorySearch}
        likeList={likeList}
        setRerender={setRerender}
        db={db}
        page={page}
      /> */}
    </>
  );
};

export default Page;
