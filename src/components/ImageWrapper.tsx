"use client";

import Image from "next/image";
import ImageSkeleton from "./skeletons/ImageSkeleton";
import { useState } from "react";

interface ImageWrapper {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageWrapper(props: ImageWrapper) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex w-full justify-center">
      <div className="relative max-w-md w-full h-xl">
        <ImageSkeleton isLoading={loading} className={props.className} />
        <div className="flex justify-center">
          <Image
            src={props.src}
            alt={props.alt}
            layout="responsive"
            width={400}
            height={400}
            objectFit="contain"
            className={`${props.className} rounded ${
              !!loading ? "none" : "block"
            }`}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
