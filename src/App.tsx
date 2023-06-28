import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import { General } from './pages/General';
import { Business } from './pages/Business';
import { Entertainment } from './pages/Entertainment';
import { Health } from './pages/Health';
import { Science } from './pages/Science';
import { Sports } from './pages/Sports';
import { Technology } from './pages/Technology';
import { Navbar } from './components/Navbar';
import { Saved } from './pages/Saved';
import { Search } from './pages/Search';
import {useState,createContext} from 'react'
interface NewsData {
  title: string;
  author: string;
  description: string;
  urlToImage: string;
  url: string;
}
interface AppContextValue {
  searchArticles: NewsData[];
  setSearchArticles: React.Dispatch<React.SetStateAction<NewsData[]>>;
}

export const AppContext = createContext<AppContextValue>({
  searchArticles: [],
  setSearchArticles: () => {},
});

function App() {
  const [searchArticles, setSearchArticles] = useState<NewsData[]>([]);
  return (
    <div className="App">
      <AppContext.Provider value={{searchArticles,setSearchArticles}}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<General/>}/>
          <Route path='/business' element={<Business/>}/>
          <Route path='/entertainment' element={<Entertainment/>}/>
          <Route path='/health' element={<Health/>}/>
          <Route path='/science' element={<Science/>}/>
          <Route path='/sports' element={<Sports/>}/>
          <Route path='/technology' element={<Technology/>}/>
          <Route path='/saved' element={<Saved/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
