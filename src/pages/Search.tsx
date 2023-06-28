import {useState,useContext} from 'react'
import { AppContext } from '../App';
import { NewsCategory } from '../components/NewsCategory';
import { NewsTemplate } from '../components/NewsTemplate';
interface NewsData {
    title: string;
    author: string;
    description: string;
    urlToImage: string;
    url: string;
}
export const Search=()=>{
    const {searchArticles} = useContext(AppContext);
    return (
        <div className="content">
            <div style={{fontWeight:"bold"}}className="head">Found {searchArticles.length} results</div>
            {searchArticles && searchArticles.map((article: NewsData, index: number) => (
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
    )
}