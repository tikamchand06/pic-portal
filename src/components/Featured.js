import React from "react";
import SingleItem from "./SingleItem";
import SimpleBar from "simplebar-react";
import CustomImage from "./CustomImage";
import { usePexelsContext } from "../PexelsProvider";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Spin, Flex, Tag, Typography, Tooltip, Collapse } from "antd";

export default function Featured() {
  const { featuredObj, fetchCollectionMedias } = usePexelsContext();

  const items = React.useMemo(() => {
    return featuredObj?.collections?.map(
      ({ id = "", title = "", mediaObj = null, isFetching = false, photos_count = 0, videos_count = 0, media_count = 0 }, j) => {
        const hasMedia = mediaObj && mediaObj?.media?.length > 0;

        return {
          key: id,
          label: (
            <Flex gap={12} align='center' justify='space-between'>
              <Typography.Text strong>{title}</Typography.Text>
              <Flex align='center'>
                <Tooltip title='Total Photos/Videos'>
                  <Tag icon={<i className='bi bi-collection mr-1' />}>{media_count}</Tag>
                </Tooltip>
                <Tooltip title='Total Photos'>
                  <Tag icon={<i className='bi bi-image mr-1' />}>{photos_count}</Tag>
                </Tooltip>
                <Tooltip title='Total Videos'>
                  <Tag className='m-0' icon={<i className='bi bi-file-play mr-1' />}>
                    {videos_count}
                  </Tag>
                </Tooltip>
              </Flex>
            </Flex>
          ),
          children: (
            <Spin spinning={isFetching} tip='Fetching...'>
              <div className='collection-medias h-100'>
                {!hasMedia && <CustomImage name='noData' className='w-100 h-200px' />}

                {hasMedia && (
                  <ResponsiveMasonry columnsCountBreakPoints={{ 200: 1, 350: 2, 750: 3, 900: 4, 1200: 5, 1500: 7, 1650: 8 }}>
                    <Masonry gutter='20px'>
                      {mediaObj?.media?.map((item, i) => (
                        <SingleItem key={`c-${item.id + i + j}`} item={item} />
                      ))}
                    </Masonry>
                  </ResponsiveMasonry>
                )}
              </div>
            </Spin>
          ),
        };
      }
    );
  }, [featuredObj]);

  return (
    <Spin spinning={featuredObj?.isLoading} tip='Loading...'>
      <SimpleBar className='p-2 h-100'>
        <Collapse
          accordion
          items={items}
          onChange={([id]) => fetchCollectionMedias(id)}
          expandIcon={({ isActive }) => <i className={`bi bi-folder${isActive ? "2-open" : ""}`} />}
        />
      </SimpleBar>
    </Spin>
  );
}
