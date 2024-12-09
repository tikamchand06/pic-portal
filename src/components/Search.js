import CustomImage from "./CustomImage";
import ItemsContainer from "./ItemsContainer";
import { usePexelsContext } from "../PexelsProvider";
import React, { useState, useCallback } from "react";
import { Spin, Flex, Input, Select, Typography } from "antd";

const { Title } = Typography;
const initailState = { query: "", page: 0, results: [], searchType: "photos", per_page: 20, total_results: 0, isLoading: false };

export default function Search() {
  const [state, setState] = useState(initailState);
  const { client, FILE_TYPES } = usePexelsContext();
  const { query = "", searchType = "photos", isLoading, results = [], page = 0, per_page = 20, total_results = 0 } = state;

  const updateState = (newState) => setState((prevState) => ({ ...prevState, ...newState }));

  const hasResults = results?.length > 0;
  const isPhotos = searchType === "photos";

  const onSearch = useCallback(
    async (query = "") => {
      if (!query) return;

      try {
        updateState({ isLoading: true });
        const res = await client[searchType].search({ query, per_page: per_page, page: page + 1 });
        updateState({ ...res, query, results: [...results, ...(isPhotos ? res?.photos : res?.videos)] });
      } catch (error) {
        console.log(error);
      } finally {
        updateState({ isLoading: false });
      }
    },
    [client, isPhotos, page, per_page, results, searchType]
  );

  return (
    <div className='search-item p-2 h-100'>
      <Input.Search
        allowClear
        size='large'
        onSearch={onSearch}
        loading={isLoading}
        enterButton='Search'
        onClear={() => updateState(initailState)}
        onChange={(e) => updateState({ ...initailState, query: e?.target?.value })}
        suffix={
          <Select
            variant='filled'
            value={searchType}
            style={{ width: 100 }}
            onClick={(e) => e?.stopPropagation()}
            options={[
              { value: "photos", label: "Photos" },
              { value: "videos", label: "Videos" },
            ]}
            suffixIcon={<i className='bi bi-chevron-down' />}
            onChange={(searchType) => updateState({ ...initailState, query, searchType })}
          />
        }
        placeholder={`Search ${isPhotos ? "Photos" : "Videos"}...`}
      />

      <div className='search-result mt-2' style={{ height: "calc(100% - 45px - 1rem)" }}>
        <Spin tip='Loading...' spinning={isLoading && !hasResults}>
          {hasResults ? (
            <>
              <ItemsContainer
                items={results}
                type={FILE_TYPES.SEARCH}
                dataLength={results.length}
                onFetchMore={() => onSearch(query)}
                hasMore={total_results > results.length}
              />
            </>
          ) : (
            <Flex vertical align='center' justify='center' style={{ margin: "auto", width: 300, paddingTop: 20 }}>
              <CustomImage name='noData' className='h-200px' />
              <Title level={5} className='mt-2'>
                Your search results will appear here...
              </Title>
            </Flex>
          )}
        </Spin>
      </div>
    </div>
  );
}
