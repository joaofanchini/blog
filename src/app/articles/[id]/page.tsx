import Image from "next/image";

interface ArticleParams {
  id: string;
}

interface ArticleParamsWrapper {
  params: Promise<ArticleParams>;
}

async function getArticle(articleId: string): Promise<any> {
  console.log("articleId", articleId);
  const response = await fetch(
    `https://jsonplaceholder.org/posts/${articleId}`
  );

  return response.json();
}

export default async function PageArticle({ params }: ArticleParamsWrapper) {
  const articleId = (await params).id;
  const data = await getArticle("1");
  console.log(data);
  return (
    <div className="flex flex-col mx-auto gap-6">
      <h1 className="text-3xl font-bold leading-tight">{data.title}</h1>
      <div className="relative w-full">
        <Image
          src={data.image}
          alt="description"
          layout="responsive"
          width={0}
          height={0}
          objectFit="contain"
        />
      </div>
      <p className="text-lg leading-relaxed text-indent">{data.content}</p>
    </div>
  );
}
