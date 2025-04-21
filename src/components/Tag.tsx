interface TagProps {
  label: string;
}

export default function Tag(props: TagProps) {
  return (
    <span className="bg-teal-700 hover:bg-teal-600 px-2 py-1 cursor-pointer rounded-full transition-colors">
      #{props.label}
    </span>
  );
}
