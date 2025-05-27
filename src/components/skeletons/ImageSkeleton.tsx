interface ImageSkeletonProps {
  isLoading: boolean;
  className?: string;
}

export default function ImageSkeleton(props: ImageSkeletonProps) {
  return (
    <div
      className={`absolute inset-0 bg-gray-600 animate-pulse rounded w-full z-10 transition-opacity duration-300 ${
        props.className
      } ${props.isLoading ? "" : "hidden"}`}
    />
  );
}
