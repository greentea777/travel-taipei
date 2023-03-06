import React, { useEffect, useState } from "react";
import Item from "./Item";
import ReactPaginate from "react-paginate";
import SearchItem from "./SearchItem";
import { useNavigate, useParams } from "react-router-dom";

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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [itemOffset]);

  return (
    <main>
      <div className="travelItem-top">
        <div className="title-left">
          <h2>Attractions List</h2>
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
        hrefBuilder={(page, pageCount, selected) =>
          page >= 1 && page <= pageCount ? `/${page}` : "#"
        }
        hrefAllControls
      />
    </main>
  );
};

export default ItemList;
