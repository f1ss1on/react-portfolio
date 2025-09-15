import React, { useState, useEffect } from "react";
import { Skeleton, SkeletonBlock } from "../Skeleton";

const Contact = () => {
  // Fetch contact page from WordPress
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch('https://blog.riadkilani.com/wp-json/wp/v2/pages?slug=contact&_embed')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch contact page');
          return res.json();
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setPage(data[0]);
          } else {
            setError('Contact page not found');
          }
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, 2000);
  }, []);


  if (loading || error || !page) {
    return (
      <main className="container contact-section">
        <h1><Skeleton width="40%" height={32} /></h1>
        <div className="contact-content">
          <SkeletonBlock lines={5} width={["100%","95%","90%","80%","60%"]} height={16} />
        </div>
        {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>Error: {error}</div>}
      </main>
    );
  }

  return (
    <section className="contact-section container" aria-labelledby="contact-title">
      <h1 id="contact-title" style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      <div className="contact-content">
        <div className="contact-info" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </div>
    </section>
  );
}
// ...existing code...

export default Contact;
