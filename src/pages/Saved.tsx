import {getDocs,collection,query,where,deleteDoc} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useEffect, useState } from 'react'
import { SavedArticle } from '../components/SavedArticle';
import { auth } from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'

export interface Article{
    title:string;
    url:string;
}
const SaveAuthenticated = ()=>{
        const [user] = useAuthState(auth);
        const [savedList,setSavedList] = useState<Article[] | null>(null);
        const savedRef = collection(db,"saved");

        
        const handleRemoveArticle = async (article: Article) => {
            try {
              // Remove the article from the savedList
              if(savedList){
            const updatedList = savedList.filter((savedArticle) => savedArticle !== article);
              setSavedList(updatedList);
              }
          
              // Find the document to remove based on the article title and URL
              const q = query(collection(db, 'saved'), where('title', '==', article.title), where('uid', '==', user?.uid));
              const snapshot = await getDocs(q);
              snapshot.forEach((doc) => {
                // Delete the document from the collection
                deleteDoc(doc.ref);
              });
            } catch (error) {
              console.error('Error removing article:', error);
            }
          };
          
        const getSaved=async()=>{
            const actualQuery = query(savedRef,where("uid","==",user?.uid))
            const actualSave = await getDocs(actualQuery);
            const uniquePairs: Article[] = [];

                actualSave.docs.forEach((doc) => {
                    const { title, url } = doc.data();
                    const isDuplicate = uniquePairs.some((pair) => pair.title === title && pair.url === url);
                    if (isDuplicate) {
                    return;
                    } else {
                    uniquePairs.push({ title, url });
                    }
                });

                setSavedList(uniquePairs);
        }
        useEffect(()=>{
            getSaved();
        },[]);
        

        return <div className='content saveWrap'>{savedList?.map((article :Article)=>(
            <SavedArticle article={article} onRemove={handleRemoveArticle}/> //post={post}
        ))}</div>
}

export const Saved = ()=>{
    const [user] = useAuthState(auth);

  return user ? <SaveAuthenticated /> : (
    <div className="saved content">Login to save articles</div>
  );
   

        
        
    
}