import React, { useEffect, useState } from 'react';
import { Image, Container, Button, Statistic, Segment } from 'semantic-ui-react';
import unsplash from '../unsplash';
import Loading from './Loading';
import TCMImage from './TCMImage';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [state, setState] = useState({ images: [], per_page: 30, page_number: 1 });
  const { images, per_page, page_number } = state;

  useEffect(() => {
    const getPhotos = async () => {
      const response = await unsplash.photos.listPhotos(page_number, per_page, 'latest');
      const images = await response.json();
      setState({ ...state, images });
    };

    const getStats = async () => {
      const response = await unsplash.stats.total();
      const stats = await response.json();
      setStats(stats);
    };

    getPhotos();
    getStats();
  }, [page_number, per_page]);

  if (images.length === 0) return <Loading />;

  let statistics = [];
  if (stats) {
    statistics = [
      { label: 'Photos', value: stats.photos },
      { label: 'Downloads', value: stats.downloads },
      { label: 'Views', value: stats.views },
      { label: 'Likes', value: stats.likes },
      { label: 'Photographers', value: stats.photographers },
      { label: 'Pixels', value: stats.pixels },
      { label: 'Downloads/Sec', value: stats.downloads_per_second },
      { label: 'View/Sec', value: stats.views_per_second }
    ];
  }

  return (
    <Container className="m-0" fluid>
      <Image.Group
        content={images.map(image => (
          <TCMImage image={image} key={image.id} />
        ))}
      />
      <Button
        content="Load More..."
        icon="sync"
        onClick={() => setState({ ...state, images: [], page_number: page_number + 1 })}
        className="mb-2"
        inverted
        primary
        fluid
      />
      <Segment
        loading={statistics.length === 0}
        content={
          <Statistic.Group size="mini" color="blue" className="text-center">
            {statistics.map((stat, key) => (
              <Statistic key={key}>
                <Statistic.Value content={stat.value} />
                <Statistic.Label content={stat.label} />
              </Statistic>
            ))}
          </Statistic.Group>
        }
      />
    </Container>
  );
};

export default Home;
