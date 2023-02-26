import React, { useState } from "react";
import Item from "./Item";
import ReactPaginate from "react-paginate";

const ItemList = ({ travelData }) => {
  const itemsPerPage = 15;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = travelData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(travelData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % travelData.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="travelItem-container">
        {currentItems.map((item) => (
          <Item key={item.id} item={item} />
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
        activeLinkClassName="active"
      />
    </>
  );
};

export default ItemList;
