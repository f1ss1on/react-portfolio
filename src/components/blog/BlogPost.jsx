import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://blog.riadkilani.com/wp-json/wp/v2/posts/${id}?_embed`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return null;

  return (
    <div className="blog-single-layout">
      <main className="blog-post-main blog-post-page">
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
          <img
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={post.title.rendered}
            style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 24 }}
          />
        )}
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </main>
      <Sidebar />
    </div>
  );
};

export default BlogPost;
