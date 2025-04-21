import articleExample from "@images/article-example.svg";
import Tag from "@/components/Tag";
import ArticleCard from "@/components/ArticleCard";

function cutWords(content: string) {
  const palavras = content.trim().split(/\s+/); // separa pelas palavras, ignora múltiplos espaços
  const primeiras20 = palavras.slice(0, 20);
  return primeiras20.join(" ");
}

async function getArticles(): Promise<any[]> {
  const response = await fetch(`https://jsonplaceholder.org/posts/`);

  return response.json();
}

export default async function Home() {
  const articles = await getArticles();
  return (
    <>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2 text-sky-400">
          Últimas tags com conteúdo novo
        </h2>
        <div className="bg-gray-800 flex gap-2 p-2 rounded-xl">
          <Tag label="java" />
          <Tag label="css" />
          <Tag label="java" />
        </div>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((a) => {
          return (
            <ArticleCard
              key={a.id}
              articleId={a.id}
              title={a.title}
              imageSrc={a.image}
              imageAlt={a.title}
              description={cutWords(a.content)}
              tags={["java"]}
            />
          );
        })}
      </main>
    </>
  );
}
