import { ArticleFile, getArticleBySlug } from "@/functions/articleUtils";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./Markdown.module.css";

interface ArticleParams {
  slug: string;
}

interface ArticleParamsWrapper {
  params: Promise<ArticleParams>;
}

function getArticle(slug: string): ArticleFile {
  try {
    return getArticleBySlug(slug);
  } catch (e) {
    console.error(e);
    notFound();
  }
}

export default async function PageArticle({ params }: ArticleParamsWrapper) {
  const slug = (await params).slug;
  const article = getArticle(slug);
  return (
    <div className="flex flex-col mx-auto gap-6">
      <h1 className="text-3xl font-bold leading-tight">{article.data.title}</h1>
      <div className="relative w-full">
        <Image
          src={article.data.imageSrc}
          alt={article.data.imageAlt}
          layout="responsive"
          width={0}
          height={0}
          objectFit="contain"
        />
      </div>
      <div
        className={styles.proseContainer}
        dangerouslySetInnerHTML={{ __html: article.formattedContent }}
      ></div>
    </div>
  );
}
