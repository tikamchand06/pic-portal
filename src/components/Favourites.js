import React from "react";
import SingleItem from "./SingleItem";
import CustomImage from "./CustomImage";
import SimpleBar from "simplebar-react";
import { Flex, Typography } from "antd";
import { usePexelsContext } from "../PexelsProvider";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Favorites() {
  const { Title } = Typography;
  const { favourites } = usePexelsContext();

  return (
    <SimpleBar className='favourites p-2 h-100' scrollableNodeProps={{ id: "fav-container" }}>
      {favourites?.length > 0 && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 200: 1, 350: 2, 750: 3, 950: 4, 1200: 5, 1650: 8 }}>
          <Masonry gutter='20px'>
            {favourites?.map((item, i) => (
              <SingleItem key={`f-${item.id + i}`} item={item} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}

      {favourites?.length <= 0 && (
        <Flex vertical align='center'>
          <CustomImage name='noData' className='h-200px' />
          <Title level={4} className='text-center mt-2'>
            No favourites found!
          </Title>
        </Flex>
      )}
    </SimpleBar>
  );
}
