import React, { useEffect, useState } from 'react';
import { Container, Header, Segment, Image } from 'semantic-ui-react';
import unsplash from '../unsplash';
import TCMImage from './TCMImage';

const Likes = () => {
  const [favorites, setFavorites] = useState(null);
  useEffect(() => {
    const getFavouriteImages = async favorites => {
      const images = favorites.map(async imageId => {
        const response = await unsplash.photos.getPhoto(imageId);
        return await response.json();
      });

      const values = await Promise.all(images);
      setFavorites(values);
    };

    if (localStorage.favorites) getFavouriteImages(JSON.parse(localStorage.favorites));
    else setFavorites([]);
  }, []);

  return (
    <Container className="m-0" fluid>
      <Header as="h2" color="blue" content="Your Favourite Images" dividing />
      <Segment loading={!favorites}>
        {favorites && favorites.length === 0 && 'No favourites'}
        {favorites && favorites.length > 0 && (
          <Image.Group
            content={favorites.map(image => (
              <TCMImage image={image} key={image.id} />
            ))}
          />
        )}
      </Segment>
    </Container>
  );
};

export default Likes;
