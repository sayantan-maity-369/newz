import {Link} from 'react-router-dom'
import { auth,provider } from '../config/firebase'
import { signInWithPopup ,signOut} from "firebase/auth"
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import {useState,useContext} from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import { SearchForm,FormData } from './SearchForm'
import { AppContext } from '../App'
interface NewsData {
    title: string;
    author: string;
    description: string;
    urlToImage: string;
    url: string;
  }
export const Navbar=()=>{
    const {setSearchArticles} = useContext(AppContext)
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const signIn=async()=>{
        await signInWithPopup(auth,provider);
    }
    const signUserOut = async()=>{
        await signOut(auth);
    }
      
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
        navigate('/search')
        setSearchArticles([])
    }
    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };
    const handleFormSubmit = async (data: FormData) => {
        try {
          // Construct the query string
          const { include, elseInclude, notInclude, sortBy } = data;
          const a = elseInclude==='' ? '' : `OR ${elseInclude}`
          const b = notInclude==='' ? '' : `NOT ${notInclude}`
          const query = `(${include}${a})${b}`;
      
          // Make the API call to NewsAPI
          const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
              q: query,
              sortBy: sortBy ? sortBy : 'publishedAt',
             // apiKey: 'your newzAPI key',
            },
          });
      
          // Process the response data as needed
          const articles = response.data.articles;
        //   console.log(articles);
          articles.forEach((article: NewsData) => {
            setSearchArticles(prev=>[...prev,article])           
          });
          
          // Close the modal
          closeModal();
        } catch (error) {
          console.error('Error fetching news articles:', error);
        }
      };
      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          performSearch();
        }
      };
      const performSearch = async () => {
        try {
            const inputElement = document.querySelector('input') as HTMLInputElement;
            const query = inputElement.value;
          const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
              q: query,
              //apiKey: 'your Newz api key',
            },
          });
    
          const articles: NewsData[] = response.data.articles;
          setSearchArticles(articles);
          navigate('/search');
          inputElement.value = '';
        } catch (error) {
          console.error('Error fetching news articles:', error);
        }
      };
      
    return (
        <div className='navbar'>
            <div className="top-nav">
                <div className="left"><button onClick={()=>{navigate('/')}}><div className="box">Newzzz
                </div></button></div>
                <div className="middle">
                <input type="text" placeholder="Search.." onKeyDown={handleKeyDown} />

                    <button onClick={openModal}><i className="fa fa-search"></i></button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <button onClick={closeModal}>close</button>
                        <SearchForm onSubmitForm={handleFormSubmit}/>
                    </Modal>
                </div>
                <div className="right">
                    <div className="saveIcon">
                    <button onClick={()=>{navigate('/saved')}}><i className="fa fa-bookmark-o fa-2x" aria-hidden="true"></i></button>
                    </div>
                    <div className="profile">
                    {!user ? (
                                <button onClick={signIn}>Login to save posts</button>
                            ) : (
                                <>
                                <div className="info">
                                <p>{(user as any)?.displayName}</p>
                                <img src={(user as any)?.photoURL || ""} width="20" height="20" alt="" />
                                </div>
                                <button onClick={signUserOut}>Log out</button>
                                </>
                            )}
                    </div>
                </div>
            </div>
            <div className="bottom-nav">
                <Link to='/'>General</Link>
                <Link to='/business'>Business</Link>
                <Link to='/entertainment'>Entertainment</Link>
                <Link to='/health'>Health</Link>
                <Link to='/science'>Science</Link>
                <Link to='/sports'>Sports</Link>
                <Link to='/technology'>Technology</Link>
            </div>
        </div>
    )
}