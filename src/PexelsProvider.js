import { createClient } from "pexels";
import { FILE_TYPES } from "./actions/constants";
import React, { useEffect, useState, useContext, createContext, useMemo, useCallback } from "react";

const { storage, downloads } = window?.chrome;

// Create Pexels Client
const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);

// Download
const onDownload = (url = "") => downloads?.download({ url });

// Get Favourites
const getFavourites = async () => await storage?.local?.get();

// Set Favourites
const setFavourites = async (favItem = "") => {
  if (!favItem) return;

  const { favourites = [] } = await getFavourites();
  await storage?.local?.set({ favourites: [...favourites, favItem] });
};

// Delete Favourites
const deleteFavourites = async (favId = "") => {
  if (!favId) return;
  const { favourites = [] } = await getFavourites();
  await storage?.local?.set({ favourites: favourites?.filter((fav) => fav?.id !== favId) });
};

// PexelsContext to keep the latest state
const PexelsContext = createContext(null);

// usePexelsContext to share this components state everywhere this component is imported
export const usePexelsContext = () => {
  const context = useContext(PexelsContext);

  if (!context) throw new Error("usePexelsContext context must be use inside PexelsProvider");

  return context;
};

export default function PexelsProvider({ children }) {
  const [state, setState] = useState({
    favourites: [],
    imgObj: { photos: [], isLoading: true },
    videoObj: { videos: [], isLoading: true },
    featuredObj: { collections: [], isLoading: true },
  });

  const updateState = useCallback((newState = {}) => setState((prevState) => ({ ...prevState, ...newState })), [setState]);

  const { imgObj, videoObj, featuredObj, favourites = [] } = state;

  useEffect(() => {
    // Curated Photos
    client.photos.curated({ per_page: 20 }).then((res) => updateState({ imgObj: { ...res, isLoading: false } }));

    // Popular Videos
    client.videos.popular({ per_page: 20 }).then((res) => updateState({ videoObj: { ...res, isLoading: false } }));

    // Featured Collections
    client.collections.featured({ per_page: 20 }).then((res) => updateState({ featuredObj: { ...res, isLoading: false } }));
  }, [updateState]);

  // Favourites
  useEffect(() => {
    // Get Previous
    getFavourites()
      .then(({ favourites = [] }) => updateState({ favourites: favourites?.reverse() }))
      .catch(console.log);

    // on change listner
    storage?.onChanged?.addListener((changes) => {
      const keys = Object.keys(changes);
      updateState(keys.reduce((obj, key) => ({ ...obj, [key]: changes[key]?.newValue?.reverse() }), {}));
    });
  }, [updateState]);

  // Fetch More Photos/Videos
  const fetchMoreData = useCallback(
    (type = FILE_TYPES.PHOTOS, id = null) => {
      if (type === FILE_TYPES.PHOTOS) {
        client.photos.curated({ per_page: 20, page: imgObj?.page + 1 }).then((res) => {
          updateState({ imgObj: { ...res, isLoading: false, photos: [...imgObj?.photos, ...res?.photos] } });
        });
      } else if (type === FILE_TYPES.VIDEOS) {
        client.videos.popular({ per_page: 20, page: videoObj?.page + 1 }).then((res) => {
          updateState({ videoObj: { ...res, isLoading: false, videos: [...videoObj?.videos, ...res?.videos] } });
        });
      } else if (type === FILE_TYPES.COLLECTION) {
        client.collections.featured({ per_page: 20, page: featuredObj?.page + 1 }).then((res) => {
          updateState({ featuredObj: { ...res, isLoading: false, collections: [...featuredObj?.collections, ...res?.collections] } });
        });
      } else if (type === FILE_TYPES.COLLECTION_MEDIA && id) {
        console.log("Fetching COLLECTION_MEDIA ", type, id);
      }
    },
    [imgObj, videoObj, featuredObj, updateState]
  );

  // Fetch Collection Medias
  const fetchCollectionMedias = React.useCallback(
    (id = "", fetchMore = false) => {
      if (!id) return;

      const cObj = featuredObj?.collections?.find((c) => c?.id === id);
      if (cObj?.mediaObj && !fetchMore) return;

      // Update 'isFetching'
      const collections = featuredObj?.collections?.map((c) => ({
        ...c,
        isFetching: c?.isFetching ? c?.isFetching : c?.id === id,
      }));

      if (!fetchMore) updateState({ featuredObj: { ...featuredObj, collections } });

      // fetch media
      client?.collections
        ?.media({ id, per_page: 20, page: (cObj?.mediaObj?.page || 0) + 1 })
        .then((res) => {
          const collections = featuredObj?.collections?.map((c) =>
            c?.id === id ? { ...c, isFetching: false, mediaObj: { ...res, media: [...(c?.mediaObj?.media || []), ...res?.media] } } : c
          );
          updateState({ featuredObj: { ...featuredObj, collections } });
        })
        .catch(console.error);
    },
    [featuredObj, updateState]
  );

  const memoizedValue = useMemo(
    () => ({
      FILE_TYPES,
      imgObj,
      client,
      videoObj,
      favourites,
      featuredObj,
      onDownload,
      fetchMoreData,
      getFavourites,
      setFavourites,
      deleteFavourites,
      fetchCollectionMedias,
    }),
    [imgObj, videoObj, favourites, featuredObj, fetchMoreData, fetchCollectionMedias]
  );

  return <PexelsContext.Provider value={memoizedValue}>{children}</PexelsContext.Provider>;
}
