import Tag from "./Tag";
import Link from "next/link";
import ImageWrapper from "./ImageWrapper";

interface ArticleCardProps {
  imageSrc: string;
  imageAlt: string;
  articleId: string;
  title: string;
  description: string;
  tags?: string[];
}

export default function ArticleCard(props: ArticleCardProps) {
  const articleId = props.articleId;
  const tagsCount: number = props.tags?.length ?? 0;
  return (
    <Link href={`/articles/${articleId}`}>
      <div className="flex flex-col p-4 items-center gap-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors w-auto">
        <ImageWrapper src={props.imageSrc} alt={props.imageAlt} />
        <h2 className="text-lg font-semibold text-cyan-300">{props.title}</h2>
        <p className="text-sm text-gray-400">{props.description}</p>
        {tagsCount > 0 && (
          <div className="flex items-center mt-2">
            <span className="self-start text-sm text-cyan-400">tags:</span>
            <div className="flex gap-2 mx-2">
              {props.tags?.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
