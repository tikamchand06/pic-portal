import React, { useState } from 'react';
import { Image, Button, Modal } from 'semantic-ui-react';

const TCMImage = ({ image }) => {
  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const getFavorites = () => (localStorage.favorites ? JSON.parse(localStorage.favorites) : []);

  const isFavorite = id => getFavorites().includes(id);

  const addToFavorites = (e, id) => {
    e.stopPropagation();

    const favorites = getFavorites();
    const index = favorites.indexOf(id);
    if (index !== -1) favorites.splice(index, 1);
    else favorites.push(id);

    localStorage.favorites = JSON.stringify(favorites);
    setIsClicked(true);
  };

  const downloadImage = url => window.chrome.tabs.create({ url, active: false });

  return (
    <>
      <span className="m-0 img-div">
        <Image src={image.urls.raw + '?w=220&h=220'} inline alt={image.alt_description} />
        <div className="actions" onClick={() => setOpen(true)}>
          <Button
            icon="arrow down"
            as="a"
            onClick={e => {
              e.stopPropagation();
              downloadImage(image.links.download + '?force=true');
            }}
          />
          <Button icon={isFavorite(image.id) ? 'heart' : 'heart outline'} onClick={e => addToFavorites(e, image.id)} />
        </div>
      </span>
      <Modal basic size="large" open={open} onClose={() => setOpen(false)} closeIcon>
        <Modal.Content content={<Image src={image.urls.regular} />} />
      </Modal>
    </>
  );
};

export default TCMImage;
