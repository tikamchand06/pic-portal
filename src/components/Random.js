import React, { useState } from 'react';
import { Container, Header, Segment, Button } from 'semantic-ui-react';
import unsplash from '../unsplash';
import TCMImage from './TCMImage';

const Random = () => {
  const [state, setState] = useState({ isLoading: false, image: null });
  const { isLoading, image } = state;

  const getRandomImage = async () => {
    setState({ ...state, isLoading: true });

    // Get Photo
    const response = await unsplash.photos.getRandomPhoto();
    const image = await response.json();
    setState({ ...state, image, isLoading: false });
  };

  return (
    <Container className="m-0" fluid>
      <Header as="h2" color="blue" content="Random Image" dividing />
      <Button primary content="Get Random Image" onClick={getRandomImage} />
      <Segment loading={isLoading} className="mt-2">
        {!image && 'Your random image will appear here.'}
        {image && <TCMImage image={image} />}
      </Segment>
    </Container>
  );
};

export default Random;
