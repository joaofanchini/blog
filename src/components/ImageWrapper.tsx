import Image from "next/image";

interface ImageWrapper {
  src: string;
  alt: string;
}

export default function ImageWrapper(props: ImageWrapper) {
  return (
    <div className="relative w-full">
      <Image
        src={props.src}
        alt={props.alt}
        layout="responsive"
        width={0}
        height={0}
        objectFit="contain"
      />
    </div>
  );
}
