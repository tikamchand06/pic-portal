import React from "react";
import { Spin } from "antd";
import ItemsContainer from "./ItemsContainer";
import { usePexelsContext } from "../PexelsProvider";

export default function Videos() {
  const { videoObj, fetchMoreData, FILE_TYPES } = usePexelsContext();

  return (
    <Spin spinning={videoObj?.isLoading} tip='Loading...'>
      <ItemsContainer
        items={videoObj?.videos}
        type={FILE_TYPES.VIDEOS}
        dataLength={videoObj?.videos.length}
        onFetchMore={() => fetchMoreData(FILE_TYPES.VIDEOS)}
        hasMore={videoObj?.total_results > videoObj?.videos.length}
      />
    </Spin>
  );
}
