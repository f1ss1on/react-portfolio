import { Link } from "react-router-dom";

import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((open) => !open);

  // Optionally close menu on nav click (for SPA UX)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header id="header" className="site-header">
      <div className="container">
        <div className="site-branding">
          <Link
            to="/"
            className="logo"
            aria-label="Riad Kilani Home"
            title="Riad Kilani - Front-end Developer"
          >
            <span className="site-title">Riad Kilani</span>
            <span className="site-description">Senior Front-End Developer | React Specialist | UI/UX Modernist</span>
          </Link>
        </div>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          onClick={handleToggle}
        >
          <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={menuOpen ? "active" : ""}
        >
          <ul onClick={handleNavClick}>
            <li>
              <Link to="/bio" title="View Bio">
                Bio
              </Link>
            </li>
            <li>
              <Link to="/portfolio" title="View Portfolio">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/blog" title="View Blog">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" title="Contact Riad Kilani">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
