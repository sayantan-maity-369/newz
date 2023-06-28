export interface Article{
    title:string;
    url:string;
}

export const SavedArticle=({ article, onRemove }: { article: Article; onRemove: (article: Article) => void })=>{

    const handleRemove=()=>{
        onRemove(article);
    }
    return (
        <div className="savedArticle">
            <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
            <button onClick={handleRemove}>X</button>
        </div>
    )
}