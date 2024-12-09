import React from "react";
import { usePexelsContext } from "../PexelsProvider";
import { Flex, Button, Avatar, Dropdown, Typography } from "antd";

const { Text, Link, Paragraph } = Typography;

export default function PreviewItem({ item = null, imgEl = null }) {
  const {
    id = "",
    url = "",
    alt = "",
    src = {},
    user = null,
    video_files = [],
    photographer = "",
    photographer_id = "",
    photographer_url = "",
  } = item || {};
  const { onDownload, favourites = [], setFavourites, deleteFavourites } = usePexelsContext();

  const isFavourite = favourites?.find((fav) => fav?.id === id);
  const isVideoFile = React.useMemo(() => video_files && video_files?.length > 0, [video_files]);
  const videoUrl = React.useMemo(() => (isVideoFile ? video_files[0]?.link : ""), [video_files, isVideoFile]);
  const downloadUrl = React.useMemo(() => (isVideoFile ? video_files[0]?.link : src?.original), [video_files, src, isVideoFile]);

  // Author
  const author = React.useMemo(() => {
    if (user && user?.id) return user;
    return { id: photographer_id, name: photographer, url: photographer_url };
  }, [user, photographer_id, photographer, photographer_url]);

  // Download Options
  const items = React.useMemo(() => {
    if (isVideoFile) {
      return video_files?.map(({ id, quality, height, width }) => ({
        key: id,
        label: (
          <>
            {quality?.toUpperCase()}{" "}
            <Text type='secondary'>
              {width}x{height}
            </Text>
          </>
        ),
      }));
    }

    return Object?.keys(src)?.map((key) => ({ key, label: key }));
  }, [video_files, isVideoFile, src]);

  const onDownloadMenuClick = React.useCallback(
    ({ key }) => {
      if (!isVideoFile) onDownload(src[key]);
      else onDownload(video_files?.find((v) => v?.id == key)?.link);
    },
    [isVideoFile, video_files, src, onDownload]
  );

  if (!item) return null;

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 8,
        background: "white",
        boxSizing: "border-box",
        width: "calc(100vw - 32px)",
        height: "calc(100vh - 32px",
      }}
    >
      <Flex align='center' justify='space-between' className='mb-2 pr-45px'>
        <Link href={author?.url} target='_blank'>
          <Flex gap={8} align='center'>
            <Avatar size='small' className='bg-ee105b fw-500'>
              {author?.name?.charAt(0)}
            </Avatar>
            <Text strong className='fs-16px'>
              {author?.name}
            </Text>
          </Flex>
        </Link>
        <Flex gap={8} align='center' justify='flex-end'>
          <Button
            color={isFavourite ? "danger" : "default"}
            variant={isFavourite ? "filled" : "outlined"}
            icon={<i className={`bi bi-heart${isFavourite ? "-fill" : ""}`} />}
            onClick={() => (isFavourite ? deleteFavourites(id) : setFavourites(item))}
          >
            Favourite
          </Button>
          {/* <Button icon={<i className='bi bi-collection' />}>Collect</Button> */}
          <Dropdown.Button
            type='primary'
            trigger={["click"]}
            onClick={() => onDownload(downloadUrl)}
            icon={<i className='bi bi-download' />}
            menu={{ items: [{ key: "h", label: "Choose a size:", disabled: true }, ...items], onClick: onDownloadMenuClick }}
          >
            Download
          </Dropdown.Button>
        </Flex>
      </Flex>

      <Flex justify='center' align='center' className='mb-2' style={{ overflow: "auto", height: "calc(100% - 36px - 20px - 2rem)" }}>
        {videoUrl ? (
          <video muted autoPlay controls src={videoUrl} className='br-8px' style={{ maxHeight: "100%", maxWidth: "100%" }} />
        ) : (
          imgEl
        )}
      </Flex>

      <Flex gap={12} align='center'>
        <Link className='min-fit-content' type='secondary' href='https://www.pexels.com/license/' target='_blank'>
          <i className='bi bi-check-circle-fill' /> Free to use
        </Link>
        {alt && (
          <Paragraph type='secondary' className='m-0' ellipsis={{ tooltip: true }} style={{ width: "calc(100vw - 280px)" }}>
            <i className='bi bi-badge-cc-fill'></i> {alt + alt}
          </Paragraph>
        )}
        <Link href={url} target='_blank' type='secondary' className='min-fit-content'>
          <i className='bi bi-info-circle-fill' /> More info
        </Link>
      </Flex>
    </div>
  );
}
