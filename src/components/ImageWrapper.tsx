import Image from "next/image";

interface ImageWrapper {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageWrapper(props: ImageWrapper) {
  return (
    <div className="flex justify-center">
      <div className="relative max-w-md w-full">
        <Image
          src={props.src}
          alt={props.alt}
          layout="responsive"
          width={0}
          height={0}
          objectFit="contain"
          className={props.className}
        />
      </div>
    </div>
  );
}
