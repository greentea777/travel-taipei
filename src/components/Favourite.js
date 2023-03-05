import React, { useEffect } from "react";
import Item from "./Item";

const Favourite = ({
  likeList,
  travelData,
  setRerender,
  handleCategorySearch,
  auth,
}) => {
  const currentUserLikeList = likeList.filter(
    (item) => item.author.userId === auth.currentUser.uid
  );

  const itemIdList = currentUserLikeList.map((item) => item.itemId);

  const favouriteList = travelData.filter((item) =>
    itemIdList.includes(item.id)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="favourite-page">
      <div className="favourite-header">
        {auth && <h2>Hello, {auth.currentUser?.displayName}!</h2>}
        <p>
          {currentUserLikeList.length === 0
            ? "You do not have favourite place on the list."
            : currentUserLikeList.length > 1
            ? `You have ${currentUserLikeList.length} favourite places on the list.`
            : `You have ${currentUserLikeList.length} favourite place on the list.`}
        </p>
      </div>
      <div className="favourite-item">
        {favouriteList.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleCategorySearch={handleCategorySearch}
            likeList={likeList}
            setRerender={setRerender}
          />
        ))}
      </div>
    </div>
  );
};

export default Favourite;
