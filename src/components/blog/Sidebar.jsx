import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton, SkeletonBlock } from "../Skeleton";

const Sidebar = () => {
  const [recent, setRecent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=5").then(
        (res) => res.json()
      ),
      fetch(
        "https://blog.riadkilani.com/wp-json/wp/v2/categories?per_page=100"
      ).then((res) => res.json()),
      fetch(
        "https://blog.riadkilani.com/wp-json/wp/v2/tags?per_page=20&orderby=count&order=desc"
      ).then((res) => res.json()),
    ]).then(([recentData, catData, tagData]) => {
      if (Array.isArray(recentData)) setRecent(recentData);
      if (Array.isArray(catData))
        setCategories(catData.filter((cat) => cat.count > 0));
      if (Array.isArray(tagData))
        setTags(tagData.filter((tag) => tag.count > 0));
      setLoading(false);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      window.open(
        `https://blog.riadkilani.com/?s=${encodeURIComponent(search)}`,
        "_blank"
      );
    }
  };

  return (
    <aside className="blog-sidebar">
      <div className="widget">
        <form onSubmit={handleSearch} style={{ marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="widget">
        <div className="widget-title">Recent Posts</div>
        <ul>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                  <Skeleton width="20%" height={14} />
                </li>
              ))
            : recent.map((post) => (
                <li key={post.id}>
                  <Link to={`/blog/${post.id}`}>
                    {post.title.rendered.replace(/<[^>]+>/g, "")}
                  </Link>
                </li>
              ))}
        </ul>
      </div>
      <div className="widget">
        <div className="widget-title">Categories</div>
        <ul>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>
                  <Skeleton width="20%" height={14} />
                </li>
              ))
            : categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/blog/category/${cat.slug}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
        </ul>
      </div>
      <div className="widget">
        <div className="widget-title">Tags</div>
        <div className="tag-cloud">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  style={{ display: "inline-block", margin: "0 6px 8px 0" }}
                >
                  <Skeleton width={48 + Math.random() * 40} height={14} />
                </span>
              ))
            : tags.map((tag) => (
                <a
                  key={tag.id}
                  href={`https://blog.riadkilani.com/tag/${tag.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tag.name}
                </a>
              ))}
        </div>
      </div>
      <div className="widget">
        <div className="widget-title">Links</div>
        <ul>
          <li>
            <a
              href="https://riadkilani.com/#/portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="https://blog.riadkilani.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
