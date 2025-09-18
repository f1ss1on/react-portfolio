
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton, SkeletonBlock } from "../Skeleton";
import Sidebar from "./Sidebar";
import BlogNav from "./BlogNav";

const BlogArchive = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryName = category ? category.replace(/-/g, ' ') : 'All';

  useEffect(() => {
    setLoading(true);
    let url = "https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=10&_embed";
    fetch(url)
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
  }, [category]);


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
    <>
      <BlogNav activeCategory={category} />
      <main className="container blog-index-page">
        <div className="page-header">
          <h2 id="page-title">Latest Posts in {categoryName}</h2>
          <p>Intereseted in {categoryName}? Read more here.</p>
        </div>
        <div className="breadcrumbs">
          <Link to="/">Home</Link> &gt; <Link to="/blog">Blog</Link> &gt;{" "}
          {categoryName}
        </div>
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
    </>
  );
};

export default BlogArchive;
