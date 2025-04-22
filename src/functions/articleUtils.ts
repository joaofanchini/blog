import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Remarkable } from "remarkable";

const md = new Remarkable();

export interface ArticleFile {
  slug: string;
  filename: string;
  show: boolean;
  formattedContent: string;
  data: { [key: string]: unknown };
}

export function getAllArticles(): ArticleFile[] {
  const articlesDir = path.join(process.cwd(), "public", "articles");
  const filenames = fs.readdirSync(articlesDir);

  return filenames
    .map((filename) => {
      const slug = encodeURI(filename.replace(/\.md$/, ""));
      const filePath = path.join(articlesDir, filename);
      const { content, data } = matter(fs.readFileSync(filePath, "utf-8"));
      return {
        slug,
        filename,
        show: data.show,
        formattedContent: md.render(content),
        data,
      };
    })
    .filter((article) => !!article.show);
}

export function getArticleBySlug(slug: string): ArticleFile {
  const article = getAllArticles().find((article) => article.slug === slug);
  if (!article) {
    throw new Error("Article not found");
  }

  return article;
}
