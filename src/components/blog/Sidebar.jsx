import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton, SkeletonBlock } from "../Skeleton";

const Sidebar = () => {
  const [recent, setRecent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);

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
            : (() => {
                const TAGS_DEFAULT_COUNT = 20;
                const counts = tags.map((tag) => tag.count);
                const min = Math.min(...counts);
                const max = Math.max(...counts);
                const minFont = 9; // px
                const maxFont = 18; // px
                const visibleTags = showAllTags
                  ? tags
                  : tags.slice(0, TAGS_DEFAULT_COUNT);
                return [
                  ...visibleTags.map((tag) => {
                    let fontSize = minFont;
                    if (max !== min) {
                      fontSize =
                        minFont +
                        ((tag.count - min) / (max - min)) * (maxFont - minFont);
                    }
                    fontSize = Math.round(fontSize);
                    return (
                      <a
                        key={tag.id}
                        href={`/blog/tag/${tag.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={
                          typeof tag.count === "number" && tag.count > 0
                            ? tag.count
                            : undefined
                        }
                        style={{
                          fontSize: fontSize + "px",
                          verticalAlign: "middle",
                        }}
                      >
                        {tag.name}
                      </a>
                    );
                  }),
                  tags.length > TAGS_DEFAULT_COUNT && (
                    <button
                      key="expand-btn"
                      type="button"
                      className="tag-cloud-expand-btn"
                      style={{
                        display: "block",
                        margin: "12px auto 0",
                        padding: "6px 18px",
                        borderRadius: 6,
                        border: "1px solid #e0e0e0",
                        background: "#f8f8f8",
                        color: "#2b72c9",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: "1em",
                      }}
                      onClick={() => setShowAllTags((v) => !v)}
                      aria-expanded={showAllTags}
                    >
                      {showAllTags
                        ? "Show fewer tags"
                        : `Show all ${tags.length} tags`}
                    </button>
                  ),
                ];
              })()}
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
