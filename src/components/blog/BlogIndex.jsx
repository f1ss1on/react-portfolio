
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton, SkeletonBlock } from "../Skeleton";
import Sidebar from "./Sidebar";

const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=10&_embed")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch posts");
          return res.json();
        })
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, 2000);
  }, []);


  if (loading || error) {
    return (
      <main className="blog-index-page">
        <div className="content-sidebar-wrapper">
          <section className="listing-content blog-content">
            <h1>
              <Skeleton width="40%" height={32} />
            </h1>
            <ul className="blog-index-list">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="blog-index-item">
                  <article className="blog-snippet">
                    <Skeleton width="60%" height={24} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={160} style={{ marginBottom: 12 }} />
                    <SkeletonBlock lines={2} width={["90%", "70%"]} height={14} />
                  </article>
                </li>
              ))}
            </ul>
          </section>
          <Sidebar />
        </div>
        {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>Error: {error}</div>}
      </main>
    );
  }

  return (
    <main className="container blog-index-page">
      <h1>Latest Blog Posts</h1>
      <div className="content-sidebar-wrapper">
        <section className="listing-content blog-content">          
          <ul className="blog-index-list">
            {posts.map((post) => (
              <li key={post.id} className="blog-index-item">
                <article className="blog-snippet">
                  <h2>
                    <Link to={`/blog/${post.slug}`}>
                      {post.title.rendered.replace(/<[^>]+>/g, "")}
                    </Link>
                  </h2>
                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post.title.rendered}
                      style={{
                        maxWidth: "100%",
                        borderRadius: 8,
                        marginBottom: 12,
                      }}
                    />
                  )}
                  <div
                    className="blog-index-excerpt"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <Link to={`/blog/${post.slug}`} className="read-more-link">
                    Read More
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>
  <Sidebar />
      </div>
    </main>
  );
};

export default BlogIndex;
