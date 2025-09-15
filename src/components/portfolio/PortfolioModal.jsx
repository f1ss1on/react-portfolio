import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
const PortfolioModal = ({ modalOpen, modalProject, closeModal }) => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  return (
    <Modal
      show={modalOpen}
      fullscreen={fullscreen}
      onHide={closeModal}
      centered
      size="lg"
      aria-labelledby="portfolio-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="portfolio-modal-title">
          {modalProject?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalProject && (
          <div className="project-wrapper">
            {/* First row: main image + description */}
            <div className="project-row">
              <div className="main-project-img">
                <img
                  src={modalProject.img?.startsWith("http") ? modalProject.img : `/images/${modalProject.img}`}
                  alt={modalProject.title}
                  loading="lazy"
                  style={{ width: "100%", borderRadius: 8, marginBottom: 0 }}
                />
              </div>
              <div className="project-description">
                <h2>Overview</h2>
                {modalProject.desc
                  .split(/\n\s*\n/)
                  .map((para, idx) => <p key={idx}>{para}</p>)
                }
              </div>
            </div>
            {/* Second row: deliverables + secondary image */}
            {(modalProject.deliverables || modalProject.secimg) && (
              <div className="project-row">
                <div className="project-deliverables">
                  <h3>Outcome & Deliverables</h3>
                  {modalProject.deliverables && modalProject.deliverables.split(/\n\s*\n/).map((para, idx) => <p key={idx}>{para}</p>)}
                </div>
                <div className="secondary-project-img">
                  {modalProject.secimg && (
                    <img
                      src={modalProject.secimg.startsWith("http") ? modalProject.secimg : `/images/${modalProject.secimg}`}
                      alt={modalProject.title + " secondary"}
                      loading="lazy"
                      style={{ width: "100%", borderRadius: 8, marginBottom: 0 }}
                    />
                  )}
                </div>
              </div>
            )}
            {modalProject.addimg && typeof modalProject.addimg === "string" && modalProject.addimg.trim().length > 0 && (
              <div className="additional-project-img">
                {modalProject.addimg.split(',').map((img, idx) => {
                  const trimmed = img.trim();
                  return (
                    <img
                      key={idx}
                      src={trimmed.startsWith("http") ? trimmed : `/images/${trimmed}`}
                      alt={modalProject.title + " additional " + (idx + 1)}
                      loading="lazy"
                    />
                  );
                })}
              </div>
            )}
            {/* Third row: tech-used */}
            <div className="tech-used">
              <strong>Technologies Used:</strong>
              <ul className="project-tech-list">
                {modalProject.tech.map((t, i) => (
                  <li key={i}>
                    <i className={t.icon}></i> {t.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PortfolioModal;
