"use client";

import { ImageLoaderProps } from "next/image";

const imageLoader = ({ src, width = 0, quality = 0 }: ImageLoaderProps) => {
  return src;
};

export default imageLoader;
