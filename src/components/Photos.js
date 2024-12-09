import React from "react";
import { Spin } from "antd";
import ItemsContainer from "./ItemsContainer";
import { usePexelsContext } from "../PexelsProvider";

export default function Photos() {
  const { imgObj, fetchMoreData, FILE_TYPES } = usePexelsContext();

  return (
    <Spin spinning={imgObj?.isLoading} tip='Loading...'>
      <ItemsContainer
        items={imgObj?.photos}
        type={FILE_TYPES.PHOTOS}
        dataLength={imgObj?.photos.length}
        onFetchMore={() => fetchMoreData(FILE_TYPES.PHOTOS)}
        hasMore={imgObj?.total_results > imgObj?.photos.length}
      />
    </Spin>
  );
}
