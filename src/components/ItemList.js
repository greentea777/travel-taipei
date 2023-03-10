import React, { useEffect, useState } from "react";
import Item from "./Item";
import ReactPaginate from "react-paginate";
import SearchItem from "./SearchItem";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

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
          page >= 1 && page <= pageCount ? `/page/${page}` : "#"
        }
        hrefAllControls
        forcePage={Number(num) - 1}
      />
    </main>
  );
};

export default ItemList;
