import React, { useState, useEffect, useRef } from "react";

// LightboxWithTouch: adds touch swipe support for lightbox navigation
function LightboxWithTouch({ images, index, setIndex, onClose, onPrev, onNext }) {
  const imgRef = useRef(null);
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    let startX = null;
    let endX = null;
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        endX = e.touches[0].clientX;
      }
    };
    const onTouchEnd = () => {
      if (startX !== null && endX !== null) {
        const diff = endX - startX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            onPrev();
          } else {
            onNext();
          }
        }
      }
      startX = null;
      endX = null;
    };
    img.addEventListener('touchstart', onTouchStart);
    img.addEventListener('touchmove', onTouchMove);
    img.addEventListener('touchend', onTouchEnd);
    return () => {
      img.removeEventListener('touchstart', onTouchStart);
      img.removeEventListener('touchmove', onTouchMove);
      img.removeEventListener('touchend', onTouchEnd);
    };
  }, [onPrev, onNext]);
  return (
    <div className="modal lightbox active" id="gallery-lightbox" tabIndex={-1} style={{ display: 'block' }}>
      <div className="lightbox-content">
        <span className="lightbox-close" onClick={onClose}>&times;</span>
        <button className="lightbox-nav lightbox-prev" aria-label="Previous image" onClick={onPrev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="lightbox-nav lightbox-next" aria-label="Next image" onClick={onNext}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <img
          className="lightbox-img"
          src={images[index]}
          alt=""
          ref={imgRef}
        />
        <div className="lightbox-info">
          <div className="lightbox-title">{images[index] ? images[index].split('/').pop() : ''}</div>
          <div className="lightbox-counter">{index + 1} / {images.length}</div>
        </div>
      </div>
    </div>
  );
}

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
                      src={`${project.img}`}
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
      {lightboxOpen && lightboxImages.length > 0 && (
        <LightboxWithTouch
          images={lightboxImages}
          index={lightboxIndex}
          setIndex={setLightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
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
          {(() => {
            const activeTabObj = galleryTabs.find(tab => tab.key === activeTab);
            const gridRef = React.useRef(null);
            // Only enable touch scroll for mobile
            React.useEffect(() => {
              const el = gridRef.current;
              if (!el) return;
              if (window.matchMedia('(pointer: coarse)').matches) {
                // Touch scroll for mobile
                let isDown = false;
                let startX;
                let scrollLeft;
                const onTouchStart = (e) => {
                  isDown = true;
                  startX = e.touches[0].pageX - el.offsetLeft;
                  scrollLeft = el.scrollLeft;
                };
                const onTouchEnd = () => { isDown = false; };
                const onTouchMove = (e) => {
                  if (!isDown) return;
                  const x = e.touches[0].pageX - el.offsetLeft;
                  const walk = (x - startX) * 1.5;
                  el.scrollLeft = scrollLeft - walk;
                };
                el.addEventListener('touchstart', onTouchStart);
                el.addEventListener('touchend', onTouchEnd);
                el.addEventListener('touchmove', onTouchMove);
                return () => {
                  el.removeEventListener('touchstart', onTouchStart);
                  el.removeEventListener('touchend', onTouchEnd);
                  el.removeEventListener('touchmove', onTouchMove);
                };
              }
            }, []);

            // Desktop nav arrows
            const scrollBy = (amount) => {
              if (gridRef.current) {
                gridRef.current.scrollBy({ left: amount, behavior: 'smooth' });
              }
            };

            return (
              <div
                key={activeTabObj.key}
                className="gallery-tab-panel active"
                id={`${activeTabObj.key}-panel`}
                data-gallery={activeTabObj.key}
                role="tabpanel"
                aria-labelledby={activeTabObj.key}
              >
                <div className="gallery-grid-nav desktop-only">
                  <button className="gallery-nav-arrow prev" aria-label="Scroll left" onClick={() => scrollBy(-300)}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="gallery-nav-arrow next" aria-label="Scroll right" onClick={() => scrollBy(300)}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                <div
                  className="gallery-grid-tiles"
                  ref={gridRef}
                >
                  {activeTabObj.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${activeTabObj.label} ${idx + 1}`}
                      className="gallery-tile"
                      loading="lazy"
                      onClick={() => openLightbox(activeTabObj.images, idx)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
