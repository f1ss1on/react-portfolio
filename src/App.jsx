
//import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Bio from './components/bio/Bio';
import Portfolio from './components/portfolio/Portfolio';
import BlogIndex from './components/blog/BlogIndex';
import Blog from './components/blog/Blog';
import BlogArchive from './components/blog/BlogArchive';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/contact/Contact';

import DynamicTitle from './DynamicTitle';
import { useState } from 'react';



function App() {
  const [postTitle, setPostTitle] = useState(null);
  return (
    <BrowserRouter>
      <DynamicTitle postTitle={postTitle} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/category/:category" element={<BlogArchive />} />
        <Route path="/blog/:slug" element={<Blog setPageTitle={setPostTitle} />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
