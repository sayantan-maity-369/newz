import { NewsTemplate } from "./NewsTemplate"; 
import { useState, useEffect } from "react";

interface NewsData {
  title: string;
  author: string;
  description: string;
  urlToImage: string;
  url: string;
}

interface NewsCategoryProps {
  category: string;
}

export const NewsCategory: React.FC<NewsCategoryProps> = ({ category }) => {
  const [articles, setArticles] = useState<NewsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=100`//apiKey={your newz api key}
        );
        const data = await response.json();
        setArticles(data.articles);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchNewsArticles();
  }, [category]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching news articles.</div>;
  }

  return (
    <div>
      {articles && articles.map((article: NewsData, index: number) => (
        <NewsTemplate
          key={index}
          title={article.title}
          author={article.author}
          description={article.description}
          image={article.urlToImage}
          url={article.url}
        />
      ))}
    </div>
  );
};
