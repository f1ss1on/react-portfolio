import React, { useState, useEffect } from "react";
import { projects, galleryTabs } from "./projects";
import PortfolioModal from "./PortfolioModal";

function truncateDescription(desc, maxLength = 120) {
  return desc.length > maxLength ? desc.substring(0, maxLength) + "..." : desc;
}

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState(galleryTabs[0].key);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleTabClick = (key) => setActiveTab(key);
  const openModal = (project) => {
    setModalProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalProject(null);
    document.body.style.overflow = '';
  };
  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImages([]);
    setLightboxIndex(0);
    document.body.style.overflow = '';
  };
  const nextLightbox = React.useCallback(
    () => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length),
    [lightboxImages.length]
  );
  const prevLightbox = React.useCallback(
    () => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length),
    [lightboxImages.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, lightboxImages.length, nextLightbox, prevLightbox]);

  return (
    <>
      <section className="portfolio" id="portfolio" aria-labelledby="portfolio-title">
        <div className="container">
          <div className="page-header">
            <h2 id="page-title">Featured Work</h2>
            <p>Elevating projects one pixel at a time.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <article className="card" key={idx}>
                <figure className="card-head">
                  <div className="project-img-16x9">
                    <img
                      src={`/images/${project.img}`}
                      alt={project.title}
                      loading="lazy"
                      onClick={() => openModal(project)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </figure>
                <div className="card-bod">
                  <h3 style={{ cursor: 'pointer' }} onClick={() => openModal(project)}>{project.title}</h3>
                  <p>{truncateDescription(project.desc)}</p>
                  <button className="btn view-more-btn" onClick={() => openModal(project)}>
                    View Project
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="proj-disc">
            <p>
              Due to confidentiality agreements, only select projects are shown here.
              If you'd like to learn more about my full portfolio—including custom
              applications and advanced design systems—please reach out for a private
              discussion.
            </p>
          </div>
        </div>
      </section>
      <PortfolioModal modalOpen={modalOpen} modalProject={modalProject} closeModal={closeModal} />
      <section className="portfolio-gallery-tabs container">
        <div className="gallery-tabs-header">
          <h2>Design Gallery</h2>
          <nav className="gallery-tabs-nav" role="tablist">
            {galleryTabs.map(tab => (
              <button
                key={tab.key}
                className={`gallery-tab-btn${activeTab === tab.key ? ' active' : ''}`}
                data-tab={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`${tab.key}-panel`}
                onClick={() => handleTabClick(tab.key)}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="gallery-tabs-content">
          {galleryTabs.map(tab => (
            <div
              key={tab.key}
              className={`gallery-tab-panel${activeTab === tab.key ? ' active' : ''}`}
              id={`${tab.key}-panel`}
              data-gallery={tab.key}
              role="tabpanel"
              aria-labelledby={tab.key}
            >
              <div className="gallery-grid-tiles">
                {tab.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${tab.label} ${idx + 1}`}
                    className="gallery-tile"
                    loading="lazy"
                    onClick={() => openLightbox(tab.images, idx)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {lightboxOpen && lightboxImages.length > 0 && (
        <div className="modal lightbox active" id="gallery-lightbox" tabIndex={-1} style={{ display: 'block' }}>
          <div className="lightbox-content">
            <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
            <button className="lightbox-nav lightbox-prev" aria-label="Previous image" onClick={prevLightbox}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="lightbox-nav lightbox-next" aria-label="Next image" onClick={nextLightbox}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <img className="lightbox-img" src={lightboxImages[lightboxIndex]} alt="" />
            <div className="lightbox-info">
              <div className="lightbox-title">{lightboxImages[lightboxIndex]}</div>
              <div className="lightbox-counter">{lightboxIndex + 1} / {lightboxImages.length}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
