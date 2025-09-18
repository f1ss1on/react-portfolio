
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton, SkeletonBlock } from "../Skeleton";
import Sidebar from "./Sidebar";
import BlogNav from "./BlogNav";

const BlogIndex = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=10&_embed")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch(() => {
        // Optionally handle error, e.g. log or ignore
      });
  }, []);


  return (
    <>
      <BlogNav />
      <main className="container blog-index-page">
        <div className="page-header">
          <h2 id="page-title">Latest Blog Posts</h2>
          <p>From random thoughts to insightful articles.</p>
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
}

export default BlogIndex;
