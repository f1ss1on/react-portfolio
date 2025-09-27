import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/images/riadkilani-profile.png";
import { Link } from "react-router-dom";
import { projects as portfolioProjects } from "../portfolio/projects";
import PortfolioModal from "../portfolio/PortfolioModal";

// Fetch latest blog posts from WordPress REST API

function ProgressCircle({ percent, color = "#8e24aa" }) {
  const [value, setValue] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let current = 0;
    let anim;
    function animate() {
      if (current < percent) {
        current += 2;
        if (current > percent) current = percent;
        setValue(current);
        anim = setTimeout(animate, 16);
      }
    }
    animate();
    return () => clearTimeout(anim);
  }, [percent]);

  const angle = (value / 100) * 360;
  const bg = `conic-gradient(${color} ${angle}deg, #eee ${angle}deg)`;

  return (
    <div className="circular-progress completed" style={{ background: bg }} ref={ref} tabIndex={0} aria-valuenow={value} aria-valuemax={100} aria-valuemin={0} role="progressbar">
      <div className="progress-value">{value}%</div>
    </div>
  );
}

const Home = () => {
  const [years, setYears] = useState(0);
  const [projects] = useState(portfolioProjects.filter((p) => p.featured));
  const [blogPosts, setBlogPosts] = useState([]);
  const [modalProject, setModalProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

    // Years of service calculation
    useEffect(() => {
      const startYear = 2009;
      setYears(new Date().getFullYear() - startYear);
    

    // Fetch latest 2 blog posts from WordPress REST API
    fetch("https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=2&_embed")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogPosts(
            data.map((post) => ({
              id: post.id,
              slug: post.slug,
              title: post.title?.rendered || "",
              date: post.date,
              excerpt: post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() || "",
              link: post.link,
              img: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/assets/images/projects/project-form.png",
            }))
          );
        }
      })
      .catch(() => {
        // fallback: keep empty or show static posts if needed
      });
  }, []);

  const openModal = (project) => {
    setModalProject(project);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setModalProject(null);
      document.body.style.overflow = "";
    }, 350);
  };

  return (
    <div className="home-section">
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <figure className="hero-image">
            <img src={profileImg} alt="Riad Kilani" />
          </figure>
          <div className="hero-content">
            <h1 id="hero-title">I am a front-end developer based in Orlando</h1>
            <Link to="/portfolio" title="View Portfolio" className="btn">
              View My Work
            </Link>
          </div>
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="container">
          <div className="about-top">
            <div className="about-text">
              <h2 id="about-title">About</h2>
              <p>
                Experienced senior front-end developer with over <span>{years}</span> years in the industry. I successfully deliver websites and web applications from design to code using modern tools
                and frameworks.
              </p>
            </div>
            <div className="progress-container" aria-label="Skill Progress">
              <div>
                <ProgressCircle percent={100} label="HTML" color="#8e24aa" />
                <div className="label">HTML</div>
              </div>
              <div>
                <ProgressCircle percent={100} label="CSS" color="#8e24aa" />
                <div className="label">CSS</div>
              </div>
              <div>
                <ProgressCircle percent={92} label="JavaScript" color="#8e24aa" />
                <div className="label">JavaScript</div>
              </div>
            </div>
          </div>
          <div className="skills-grid" aria-label="Skills">
            {[
              { icon: "fab fa-html5", label: "HTML5" },
              { icon: "fab fa-css3-alt", label: "CSS3" },
              { icon: "fab fa-js", label: "JavaScript" },
              { icon: "fab fa-react", label: "React" },
              { icon: "fab fa-wordpress", label: "WordPress" },
              { icon: "fab fa-drupal", label: "Drupal" },
              { icon: "fab fa-vuejs", label: "Vue.js" },
              { icon: "fab fa-sass", label: "Sass" },
              { icon: "fab fa-gulp", label: "Gulp" },
              { icon: "fab fa-figma", label: "Figma" },
              { icon: "fab fa-git-alt", label: "Git" },
              { icon: "fab fa-illustrator", label: "Illustrator" },
              { icon: "fab fa-photoshop", label: "Photoshop" },
              { icon: "fab fa-indesign", label: "InDesign" },
              { icon: "fab fa-aftereffects", label: "After Effects" },
            ].map((skill) => (
              <div className="skill" key={skill.label}>
                <i className={skill.icon} aria-label={skill.label}></i>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hportfolio" id="hportfolio" aria-labelledby="portfolio-title">
        <div className="container">
          <div className="port-header">
            <h2 id="portfolio-title">Featured Work</h2>
            <p>A showcase of my most impactful projects.</p>
          </div>
          <div className="projects projects-grid">
            {projects.map((project, i) => (
              <article className="card featured-project clickable-card" key={i} onClick={() => openModal(project)} tabIndex={0}>
                <figure className="card-head">
                  <div className="project-img-16x9">
                    <img src={project.img} alt={project.title} loading="lazy" />
                  </div>
                </figure>
                <div className="card-bod">
                  <h3>{project.title}</h3>
                  <p>{project.desc.length > 120 ? project.desc.substring(0, 120) + "..." : project.desc}</p>
                  <button className="btn view-more-btn" tabIndex={-1}>
                    View More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-contact" aria-labelledby="blog-title contact-title">
        <div className="container">
          <div className="blog-contact-grid">
            <section className="blog blog-preview" aria-labelledby="blog-title">
              <h2 id="blog-title">From The Blog</h2>
              <div id="home-latest-blog-posts">
                {blogPosts.length === 0 ? (
                  <div>Loading latest blog posts...</div>
                ) : (
                  blogPosts.map((post, i) => (
                    <article className="hblog-snippet" key={i}>
                      <div className="blog-content">
                        <h3>
                          <Link to={`/blog/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title }} />
                        </h3>
                        <small>
                          {new Date(post.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </small>
                        <div className="excerpt-with-image">
                          <p>
                            {post.excerpt} <Link to={`/blog/${post.slug}`}>Read More</Link>
                          </p>
                          <div className="blog-featured-image">
                            <img src={post.img} alt={post.title} loading="lazy" />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>

            <section className="contacth" aria-labelledby="contact-title">
              <h2 id="contact-title">Get In Touch</h2>
              <iframe src="https://blog.riadkilani.com/shortcontact/" width="100%" height="600" frameBorder="0" title="Contact Form"></iframe>
            </section>
          </div>
        </div>
      </section>

      <PortfolioModal modalOpen={modalOpen} modalProject={modalProject} closeModal={closeModal} />
    </div>
  );
};

export default Home;
