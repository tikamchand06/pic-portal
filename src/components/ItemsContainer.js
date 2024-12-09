import React from "react";
import { Skeleton } from "antd";
import SingleItem from "./SingleItem";
import SimpleBar from "simplebar-react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function ItemsContainer({
  items = [],
  type = "app",
  className = "",
  dataLength = 0,
  hasMore = false,
  onFetchMore = () => {},
}) {
  const scrollableTargetId = `${type}-container`;

  return (
    <SimpleBar className={`p-2 h-100 ${className}`} scrollableNodeProps={{ id: scrollableTargetId }}>
      <InfiniteScroll
        hasMore={hasMore}
        dataLength={dataLength}
        next={() => onFetchMore()}
        scrollableTarget={scrollableTargetId}
        loader={
          <div className='flex-item gap-1 mt-2 flex-column'>
            <Skeleton.Input active block />
            <Skeleton.Input active block />
            <Skeleton.Input active block />
          </div>
        }
      >
        <MasonryContainer items={items} />
      </InfiniteScroll>
    </SimpleBar>
  );
}

function MasonryContainer({ items = [] }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 200: 1, 350: 2, 750: 3, 950: 4, 1200: 5, 1650: 8 }}>
      <Masonry gutter='20px'>
        {items?.map((item, i) => (
          <SingleItem key={`p-${item.id + i}`} item={item} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
