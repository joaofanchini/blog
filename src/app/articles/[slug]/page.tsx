import He from "he";

import Prism from "prismjs";
import "prismjs/components/prism-java";

import { notFound } from "next/navigation";
import { Metadata } from "next";

import { ArticleFile, getArticleBySlug } from "@/functions/ArticleUtils";
import ImageWrapper from "@/components/ImageWrapper";
import { formatDate } from "@/functions/DateUtils";

import styles from "./Markdown.module.css";
import "prismjs/themes/prism-tomorrow.css";

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

function predictReadTimeInMinutes(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 180); // Assuming average reading speed of 150 words per minute
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
      type: "article",
      url: `https://echoesfromthejourney.com/articles/${slug}`,
      title: article.title,
      description: article.preview,
      images: [
        {
          url: article.imageSrc,
          alt: article.imageAlt,
        },
      ],
      authors: ["https://www.linkedin.com/in/joaofanchini"],
      publishedTime: article.date.toISOString(),
    },
  };
}

function highlightCodeBlocks(html: string): string {
  return html.replace(
    /<pre><code class="language-([a-zA-Z0-9-]+)">([\s\S]*?)<\/code><\/pre>/g,
    (match, lang, code) => {
      const language = Prism.languages[lang];
      if (!language) return match;
      const decodedCode = He.decode(code.trim());
      const highlighted = Prism.highlight(decodedCode, language, lang);
      return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
    }
  );
}

export default async function PageArticle({ params }: ArticleParamsWrapper) {
  const slug = (await params).slug;
  const article = getArticle(slug);

  return (
    <div className="flex flex-col mx-auto gap-6">
      <h1 className="text-3xl font-bold leading-tight">{article.title}</h1>
      <div className="flex justify-start w-full gap-2 items-center text-gray-500 text-xs">
        <p>{predictReadTimeInMinutes(article.content)} min de leitura</p>
        <p>•</p>
        <p>{formatDate(article.date)}</p>
      </div>
      <ImageWrapper src={article.imageSrc} alt={article.imageAlt} />
      <div
        className={styles.proseContainer}
        dangerouslySetInnerHTML={{
          __html: highlightCodeBlocks(article.formattedContent),
        }}
      ></div>
    </div>
  );
}
