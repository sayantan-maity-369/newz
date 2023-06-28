import {useAuthState} from 'react-firebase-hooks/auth'
import { auth,db } from '../config/firebase';
import { addDoc,collection} from 'firebase/firestore';
import {useState} from 'react'
interface NewsData{
    title : string;
    author:string;
    description: string;
    image:string;
    url:string;
}
interface saveData{
    title: string;
    url:string;
    uid:string;
}

export const NewsTemplate=(article: NewsData)=>{
    
    const [state,setState] = useState("fa fa-bookmark-o fa-2x")
    

    const saveRef = collection(db,"saved");

    const [user] = useAuthState(auth);
    const handleSave=async()=>{
        if(!user) alert("You need to sign in to save articles");
        else{
            await addDoc(saveRef,{
                title:article.title,
                url:article.url,
                uid:user?.uid
            });
            setState("fa fa-bookmark fa-2x");
        }
    }
    return (
        <div className="article">
            <div className="article-wrap">
            <div className="title">
            <p>{article.title}</p>
            <button onClick={handleSave}><i className={state} aria-hidden="true"></i></button>
            </div>
            <div className="specs">
                {article.author && <p>Story by {article.author} </p>}
            </div>
            <div className="article-photo">
                <img src={article.image} />
            </div>
            <div className="article-desc">
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more...</a>
            </div>
            </div>
        </div>
    )
}