import React from "react";
import SimpleBar from "simplebar-react";
import CustomImage from "./CustomImage";
import ItemsContainer from "./ItemsContainer";
import { usePexelsContext } from "../PexelsProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin, Flex, Tag, Typography, Tooltip, Collapse, Skeleton } from "antd";

export default function Collections() {
  const { FILE_TYPES, featuredObj, fetchMoreData, fetchCollectionMedias } = usePexelsContext();

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
                  <ItemsContainer
                    className='h-500px'
                    key={`submedia${id}`}
                    items={mediaObj?.media}
                    type={`submedia${id + j}`}
                    dataLength={mediaObj?.media.length}
                    onFetchMore={() => fetchCollectionMedias(id, true)}
                    hasMore={mediaObj?.total_results > mediaObj?.media.length}
                  />
                )}
              </div>
            </Spin>
          ),
        };
      }
    );
  }, [featuredObj, fetchCollectionMedias]);

  return (
    <Spin spinning={featuredObj?.isLoading} tip='Loading...'>
      <SimpleBar className='p-2 h-100' scrollableNodeProps={{ id: "collection-container" }}>
        <InfiniteScroll
          scrollableTarget='collection-container'
          dataLength={featuredObj?.collections.length}
          next={() => fetchMoreData(FILE_TYPES.COLLECTION)}
          hasMore={featuredObj?.total_results > featuredObj?.collections.length}
          loader={
            <div className='flex-item gap-1 mt-2 flex-column'>
              <Skeleton.Input active block />
              <Skeleton.Input active block />
              <Skeleton.Input active block />
            </div>
          }
        >
          <Collapse
            accordion
            items={items}
            onChange={([id]) => fetchCollectionMedias(id)}
            expandIcon={({ isActive }) => <i className={`bi bi-folder${isActive ? "2-open" : ""}`} />}
          />
        </InfiniteScroll>
      </SimpleBar>
    </Spin>
  );
}
