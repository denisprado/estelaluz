"use client";

import { ImageLoaderProps } from "next/image";

const imageLoader = ({ src, width = 1000, quality = 0 }: ImageLoaderProps) => {
  return src;
};

export default imageLoader;
