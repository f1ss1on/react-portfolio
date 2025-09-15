import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/images/riad-kilani-profile.jpg";

const Bio = () => {
  const [years, setYears] = useState(0);
  const bioContentRef = useRef(null);
  const processRefs = useRef([]);
  const skillsRefs = useRef([]);

  // Years of service calculation
  useEffect(() => {
    const startYear = 2004;
    setYears(new Date().getFullYear() - startYear);
  }, []);

  // Fade-in/intersection animations
  useEffect(() => {
    const elements = [
      bioContentRef.current,
      ...processRefs.current,
      ...skillsRefs.current,
    ].filter(Boolean);
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });
    if ("IntersectionObserver" in window) {
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "50px" }
      );
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    } else {
      // Fallback
      elements.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 300 + i * 150);
      });
    }
  }, []);

  return (
    <section className="bio-section container" aria-labelledby="bio-title">
      <div className="page-header">
        <h2 id="page-title">About Riad Kilani</h2>
        <h3>Front-End Developer &amp; UI Specialist</h3>
      </div>
      <div className="bio-content" ref={bioContentRef}>
        <div className="bio-about">
          <div className="bio-image">
            <img src={profileImg} alt="Riad Kilani Portrait" />
          </div>
          <div className="text-wrap">
            <p>
              With over <span>{years}</span> years of experience, I specialize
              in crafting modern, accessible, and high-performance web
              interfaces. My passion lies in transforming ideas into engaging
              digital experiences using the latest technologies and design
              systems.
            </p>
            <p>
              I have worked with startups, agencies, and global brands,
              delivering solutions that blend creativity with technical
              excellence. My toolkit includes React, Sass, Figma, and a strong
              foundation in HTML, CSS, and JavaScript.
            </p>
          </div>
        </div>
        <h3>My Front-End Process</h3>
        <ol className="bio-process">
          {[
            "Discovery & Planning: Understand project goals, target audience, and requirements.",
            "Wireframing & Design: Create wireframes and UI designs using tools like Figma.",
            "Development: Build responsive layouts with HTML, CSS (Sass), and JavaScript frameworks (React).",
            "Testing & Accessibility: Ensure cross-browser compatibility and WCAG accessibility standards.",
            "Optimization: Optimize performance, assets, and code for fast load times.",
            "Deployment & Maintenance: Launch the site and provide ongoing support and improvements.",
          ].map((text, i) => (
            <li key={i} ref={(el) => (processRefs.current[i] = el)}>
              {text.includes(":") ? (
                <>
                  <strong>{text.split(":")[0]}:</strong> {text.split(":")[1]}
                </>
              ) : (
                text
              )}
            </li>
          ))}
        </ol>
        </div>
        <div className="section-header">
          <h3>My Skills</h3>
          <p>I’ve developed a very particular set of front-end skills, skills I’ve acquired over a long career, skills that make me a nightmare for bad code.</p>
        </div>
        <div className="bio-skills-wrapper">
          
          {/* Grouped skills by category */}
          <div className="skills-group">
            <h4>Languages:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-html5", label: "HTML5" },
                { icon: "fab fa-css3-alt", label: "CSS3/SCSS" },
                { icon: "fab fa-js", label: "JavaScript (ES6+)" },
                { icon: "fab fa-php", label: "PHP" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>Frameworks/Libraries:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-react", label: "React/Redux" },
                { icon: "fab fa-vuejs", label: "Vue.js" },
                { icon: "fab fa-angular", label: "AngularJS" },
                { icon: "fab fa-js", label: "jQuery" },
                { icon: "fab fa-bootstrap", label: "Bootstrap" },
                { icon: "fab fa-node-js", label: "Node.js" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[10 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>Tools/Platforms:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-git-alt", label: "Git" },
                { icon: "fab fa-gulp", label: "Gulp" },
                { icon: "fab fa-aws", label: "AWS" },
                { icon: "fab fa-microsoft", label: "Azure" },
                { icon: "fab fa-webpack", label: "Webpack" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[20 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>CMS:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-wordpress", label: "WordPress" },
                { icon: "fab fa-drupal", label: "Drupal" },
                { icon: "fab fa-magento", label: "Magento" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[30 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>UX/UI &amp; Design:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-figma", label: "Figma" },
                { icon: "fab adb fa-illustrator", label: "Illustrator" },
                { icon: "fab adb fa-photoshop", label: "Photoshop" },
                { icon: "fab fa-adobe", label: "Adobe CC" },
                { icon: "fab fa-css3-alt", label: "Responsive Design" },
                { icon: "fab fa-css3-alt", label: "CSS Grid/Flexbox" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[40 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>Analytics/SEO:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-google", label: "Google Analytics" },
                { icon: "fab fa-google", label: "GTM" },
                { icon: "fab fa-hotjar", label: "Hotjar" },
                { icon: "fas fa-vial", label: "A/B Testing" },
                { icon: "fas fa-search", label: "SEO" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[50 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          <strong>Let's connect:</strong>
          <a
            href="https://www.linkedin.com/in/riadkilani"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a
            href="https://github.com/f1ss1on"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href="https://codepen.io/f1ss1on" className="btn">
            <i className="fab fa-codepen"></i> Codepen
          </a>
          <a href="https://x.com/f1ss1on" className="btn">
            <i className="fab fa-x-twitter"></i> X
          </a>
        </p>
      
    </section>
  );
};

export default Bio;
