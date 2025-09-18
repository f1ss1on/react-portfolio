import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BlogNav = ({ activeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    fetch("https://blog.riadkilani.com/wp-json/wp/v2/categories?per_page=100")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data.filter((cat) => cat.count > 0));
      });
  }, []);

  return (
    categories.length > 0 && (
      <nav className={`blog-nav${navOpen ? ' open' : ''}`} aria-label="Blog Navigation">
        <div className="container">
          <button
            className="blog-nav-toggle"
            aria-label={navOpen ? "Hide categories" : "Show categories"}
            aria-expanded={navOpen}
            aria-controls="blog-nav-list"
            type="button"
            onClick={() => setNavOpen((open) => !open)}
          >
            Categories &#9776;
          </button>
          <ul
            id="blog-nav-list"
            className={`blog-navigation${navOpen ? ' open' : ''}`}
          ><li className="blog-nav-title">Categories</li>
            {categories.filter(cat => cat.parent === 0).map(cat => (
                
              <li key={cat.id}>
                <Link
                  to={`/blog/category/${cat.slug}`}
                  className={`blog-category-link${activeCategory === cat.slug ? ' active' : ''}`}
                  onClick={() => setNavOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  );
};

export default BlogNav;
