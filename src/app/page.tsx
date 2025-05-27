import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/functions/ArticleUtils";

export default async function Home() {
  const articles = getAllArticles();
  return (
    <>
      {/* <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2 text-sky-400">
          Últimas tags com conteúdo novo
        </h2>
        <div className="bg-gray-800 flex gap-2 p-2 rounded-xl">
          <Tag label="java" />
          <Tag label="css" />
          <Tag label="java" />
        </div>
      </section> */}

      <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.slug}
              articleId={article.slug}
              title={article.title}
              imageSrc={article.imageSrc}
              imageAlt={article.imageAlt}
              description={article.preview}
              date={article.date}
            />
          );
        })}
      </main>
    </>
  );
}
