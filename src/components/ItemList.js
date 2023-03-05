import React, { useEffect, useState } from "react";
import Item from "./Item";
import ReactPaginate from "react-paginate";
import SearchItem from "./SearchItem";

const ItemList = ({
  travelData,
  search,
  setSearch,
  handleSearch,
  handleCategorySearch,
  likeList,
  setRerender,
  db,
}) => {
  // Pagination //
  const itemsPerPage = 15;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = travelData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(travelData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % travelData.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="travelItem-top">
        <div className="title-left">
          <h2>Attraction List</h2>
          <h4>{`${db.total} Attractions`}</h4>
        </div>
        <SearchItem
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
      </div>

      <div className="travelItem-container">
        {currentItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleCategorySearch={handleCategorySearch}
            likeList={likeList}
            setRerender={setRerender}
          />
        ))}
      </div>
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
      />
    </>
  );
};

export default ItemList;
