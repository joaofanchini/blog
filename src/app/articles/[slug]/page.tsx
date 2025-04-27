import { notFound } from "next/navigation";
import { Metadata } from "next";

import { ArticleFile, getArticleBySlug } from "@/functions/articleUtils";
import styles from "./Markdown.module.css";
import ImageWrapper from "@/components/ImageWrapper";

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

export async function generateMetadata({
  params,
}: ArticleParamsWrapper): Promise<Metadata> {
  const slug = (await params).slug;
  const article = getArticle(slug);
  return {
    title: {
      template: `%s | ${article.title}`,
      default: article.title,
    },
    description: article.preview,
    openGraph: {
      title: article.title,
      description: article.preview,
      images: [
        {
          url: article.imageSrc,
          alt: article.imageAlt,
        },
      ],
    },
  };
}

export default async function PageArticle({ params }: ArticleParamsWrapper) {
  const slug = (await params).slug;
  const article = getArticle(slug);
  return (
    <div className="flex flex-col mx-auto gap-6">
      <h1 className="text-3xl font-bold leading-tight">{article.title}</h1>
      <ImageWrapper src={article.imageSrc} alt={article.imageAlt} />
      <div
        className={styles.proseContainer}
        dangerouslySetInnerHTML={{ __html: article.formattedContent }}
      ></div>
    </div>
  );
}
