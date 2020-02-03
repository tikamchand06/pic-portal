import React, { useState } from 'react';
import { Container, Header, Segment, Image, Input, Button } from 'semantic-ui-react';
import unsplash from '../unsplash';
import TCMImage from './TCMImage';

const Search = () => {
  const [state, setState] = useState({
    isLoading: false,
    searchString: '',
    results: [],
    per_page: 30,
    page_number: 1
  });
  const { isLoading, results, searchString, page_number, per_page } = state;

  const searchPhoto = async (loadMore = false) => {
    let newState = { ...state, isLoading: true };
    if (loadMore) newState = { ...newState, results: [], page_number: page_number + 1 };

    setState(newState);

    const request = await unsplash.search.photos(searchString, page_number, per_page);
    const response = await request.json();
    setState({ ...newState, isLoading: false, results: response.results });
  };

  return (
    <Container className="m-0" fluid>
      <Header as="h2" color="blue" content="Search Images" dividing />
      <Input
        label={
          <Button
            content="Search"
            primary
            icon="search"
            disabled={isLoading || !searchString}
            loading={isLoading}
            onClick={() => searchPhoto()}
          />
        }
        labelPosition="right"
        placeholder="Search images..."
        value={searchString}
        onChange={(e, d) => setState({ ...state, searchString: d.value })}
        fluid
      />

      <Segment loading={isLoading} className="mt-2">
        {results.length === 0 ? (
          'Your search results will appear here.'
        ) : (
          <>
            <Image.Group
              content={results.map(image => (
                <TCMImage image={image} key={image.id} />
              ))}
            />
            <Button
              content="Load More..."
              icon="sync"
              onClick={() => searchPhoto(true)}
              className="mb-2"
              inverted
              primary
              fluid
              disabled={!searchString && results.length === 0}
            />
          </>
        )}
      </Segment>
    </Container>
  );
};

export default Search;
