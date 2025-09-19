import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Skeleton, SkeletonBlock } from '../Skeleton'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import Sidebar from './Sidebar'
import BlogNav from './BlogNav'

const Blog = ({ setPageTitle }) => {
  // BlogPost logic
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const contentRef = useRef(null)

  useEffect(() => {
    // Fetch categories for nav
    fetch('https://blog.riadkilani.com/wp-json/wp/v2/categories?per_page=100')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Removed setCategories call
        }
      })
    if (slug) {
      setLoading(true)
      fetch(`https://blog.riadkilani.com/wp-json/wp/v2/posts?slug=${slug}&_embed`)
        .then(res => {
          if (!res.ok) throw new Error('Post not found')
          return res.json()
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setPost(data[0])
            if (setPageTitle) setPageTitle(data[0].title.rendered.replace(/<[^>]+>/g, ''))
          } else {
            setError('Post not found')
            if (setPageTitle) setPageTitle(null)
          }
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
          if (setPageTitle) setPageTitle(null)
        })
    }
  }, [slug, setPageTitle])

  // Highlight code and add copy buttons after post content is rendered
  useEffect(() => {
    if (!post) return
    const contentEl = contentRef.current
    if (!contentEl) return
    // Highlight code blocks
    contentEl.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block)
    })
    // Add copy buttons to wp-block-code
    contentEl.querySelectorAll('pre.wp-block-code').forEach(pre => {
      if (pre.querySelector('.copy-code-btn')) return // Don't add twice
      const code = pre.querySelector('code')
      if (!code) return
      const btn = document.createElement('button')
      btn.className = 'copy-code-btn'
      btn.type = 'button'
      btn.textContent = 'Copy'
      btn.style.margin = '8px 0px 0px'
      btn.style.float = 'right'
      btn.style.fontSize = '0.8em'
      btn.style.padding = '2px 10px'
      btn.style.borderRadius = '4px'
      btn.style.border = 'none'
      btn.style.background = 'rgb(238, 238, 238)'
      btn.style.cursor = 'pointer'
      pre.insertBefore(btn, code)
    })
  }, [post])

  if (loading || error || !post) {
    return (
      <main className='blog-single-page'>
        <article className='blog-post'>
          <h1>
            <Skeleton width='60%' height={32} />
          </h1>
          <Skeleton width='100%' height={220} style={{ marginBottom: 18 }} />
          <SkeletonBlock lines={6} width={['100%', '95%', '90%', '80%', '70%', '60%']} height={16} />
        </article>
        {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>Error: {error}</div>}
      </main>
    )
  }

  return (
    <>
      <BlogNav />
      <main className='blog-post-main blog-post-page'>
        <div className='breadcrumbs'>
          <Link to='/'>Home</Link> &gt; <Link to='/blog'>Blog</Link> &gt; {post.title.rendered}
        </div>
        <div className='content-sidebar-wrapper'>
          <section className='single-content blog-content'>
            <article className='blog-full'>
              <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <img
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  style={{
                    maxWidth: '100%',
                    borderRadius: 8,
                    marginBottom: 24,
                  }}
                />
              )}
              <div
                className='blog-post-content'
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </article>
          </section>
          <Sidebar />
        </div>
      </main>
    </>
  )
}

// ...existing code...
export default Blog
