import { Link } from "react-router-dom";

const Footer = () => (
  <footer id="footer" className="site-footer">
    <div className="container">
      <div className="site-branding">
        {/* If you want this to route internally, use Link. Otherwise, keep as <a> for external. */}
        <Link to="/home" className="logo" aria-label="Riad Kilani Home" title="Riad Kilani - Front-end Developer">
          <span className="site-title">Riad Kilani</span>
          <span className="site-description">Front-End Developer</span>
        </Link>
      </div>
      <div className="footer-contact">
        <div className="socials">
          <a href="https://www.linkedin.com/in/riad-kilani/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/f1ss1on" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
          <a href="https://x.com/f1ss1on" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-x-twitter"></i></a>
          <a href="https://codepen.io/f1ss1on" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-codepen"></i></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 