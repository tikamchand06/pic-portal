import React from "react";
import { Image } from "antd";
import noData from "../assets/nodata.jpg";

const images = { noData };

export default function CustomImage({ name = "", ...props }) {
  return images[name] ? <Image src={images[name]} alt={`image ${name}`} {...props} preview={false} /> : "";
}
