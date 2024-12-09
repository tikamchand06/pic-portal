import React from "react";
import PreviewItem from "./PreviewItem";
import { usePexelsContext } from "../PexelsProvider";
import { Flex, Avatar, Button, Image, Tooltip, Typography } from "antd";

const { Link, Text } = Typography;
const stopPropagation = (e) => e?.stopPropagation();

export default function SingleItem({ item }) {
  const { favourites, onDownload, setFavourites, deleteFavourites } = usePexelsContext();
  const { id, alt = "", src = {}, image = "", video_files = [], user, photographer_id, photographer, photographer_url } = item;

  const isFavourite = favourites?.find((fav) => fav?.id === id);

  const downloadUrl = React.useMemo(() => {
    if (video_files && video_files?.length) return video_files[0]?.link;
    return src?.original;
  }, [video_files, src]);

  // Author
  const author = React.useMemo(() => {
    if (user) return user;
    return { id: photographer_id, name: photographer, url: photographer_url };
  }, [user, photographer_id, photographer, photographer_url]);

  return (
    <Image
      alt={alt}
      src={image || src?.medium}
      className='br-8px minh-125px'
      preview={{
        toolbarRender: () => null,
        imageRender: (imgEl) => <PreviewItem item={item} imgEl={imgEl} />,
        mask: (
          <Flex vertical className='h-100 w-100 p-1' justify='space-between'>
            <Flex gap={5} align='center' justify='flex-end' onClick={stopPropagation}>
              <Tooltip title={`${isFavourite ? "Remove from" : "Add to"} Favourites`}>
                <Button
                  variant='filled'
                  color={isFavourite ? "danger" : "default"}
                  icon={<i className={`bi bi-heart${isFavourite ? "-fill" : ""}`} />}
                  onClick={() => (isFavourite ? deleteFavourites(id) : setFavourites(item))}
                />
              </Tooltip>
              {/* <Tooltip title='Add to Collections'>
                <Button color='default' variant='filled' icon={<i className='bi bi-collection' />} />
              </Tooltip> */}
              <Tooltip title='Download'>
                <Button
                  color='primary'
                  variant='solid'
                  icon={<i className='bi bi-download' />}
                  onClick={() => onDownload(downloadUrl)}
                />
              </Tooltip>
            </Flex>
            <Flex flex={1} justify='center' align='center'>
              <Button color='default' variant='filled' icon={<i className='bi bi-eye' />}>
                Preview
              </Button>
            </Flex>
            <Link href={author?.url} target='_blank' onClick={stopPropagation}>
              <Flex gap={8} align='center'>
                <Avatar size='small' className='bg-ee105b fw-500'>
                  {author?.name?.charAt(0)}
                </Avatar>
                <Text style={{ width: "calc(100% - 35px)" }} className='text-white fw-500' ellipsis={{ tooltip: true }}>
                  {author?.name}
                </Text>
              </Flex>
            </Link>
          </Flex>
        ),
      }}
    />
  );
}
