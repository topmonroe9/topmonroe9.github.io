import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import "./styles.css";
import localization from "./localization.js";
import portfolioProjects from "./portfolioData.js";
// Контекст для управления языком
const LanguageContext = createContext();

// Компоненты для резюме
function ResumeApp() {
  const [language, setLanguage] = useState("ru");
  const [showLoader, setShowLoader] = useState(false);

  // Обработчик для переключения языка с эффектом загрузки
  const handleLanguageChange = (lang) => {
    setShowLoader(true);
    setTimeout(() => {
      setLanguage(lang);
      setShowLoader(false);
    }, 300);
  };

  // Эффект для установки заголовка страницы при изменении языка
  useEffect(() => {
    document.title = localization[language].page_title;
  }, [language]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.defer = true;
    script.setAttribute(
      "data-cf-beacon",
      '{"token": "6058b50e19d9440795dfaeb043349da3"}'
    );
    document.body.appendChild(script);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        strings: localization[language],
        setLanguage: handleLanguageChange,
      }}
    >
      <div className={`resume-container ${showLoader ? "loading" : ""}`}>
        {showLoader && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        <Header />
        <PositionSection />
        <main>
          <div className="container">
            <SkillsSection />
            <AchievementsSection />
            <PortfolioSection />
            <ExperienceSection />
            <SummarySection />

            <EducationSection />
            <MotivationSection />
            <CaseStudiesSection />
          </div>
        </main>
      </div>
    </LanguageContext.Provider>
  );
}

// Компонент шапки резюме
function Header() {
  const { language, strings, setLanguage } = useContext(LanguageContext);

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="profile">
            <div className="profile-info">
              <h1 id="name">{strings.name}</h1>
              <div className="subtitle" id="personal-info">
                {strings.age} -
                <a
                  href="https://github.com/topmonroe9"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/topmonroe9
                </a>
              </div>
              <div className="contact-info">
                {/* <div className="contact-item">
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 10.999H22C22 5.869 18.127 2 12.99 2V4C17.052 4 20 6.943 20 10.999Z" />
                    <path d="M13 8C15.103 8 16 8.897 16 11H18C18 7.775 16.225 6 13 6V8Z" />
                    <path d="M13.422 16.413L16.277 19.262C16.667 19.652 17.333 19.652 17.723 19.262L18.638 18.347C19.027 17.958 19.027 17.293 18.638 16.903L15.792 14.057L13.422 16.413Z" />
                    <path d="M6.5 5.5L10.5 9.5" />
                    <path d="M7.55001 3.23001L11.55 7.23001" />
                    <path d="M5.45001 7.77001L9.45001 11.77" />
                    <path d="M11.0731 11.3181L7.72709 14.664C5.56109 16.83 5.56109 16.5391 5.56109 18.6941C5.56109 20.8491 3.40609 20.8491 3.40609 20.8491C3.40609 20.8491 3.40609 18.6941 5.56109 18.6941C7.71609 18.6941 7.42309 18.6941 9.59109 16.5361L12.9371 13.1901" />
                  </svg>
                  <a href="tel:+79534424717" id="phone">
                    +7 (953) 442-47-17
                  </a>
                </div> */}
                <div className="contact-item">
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" />
                    <path d="M8 13.5C8 12.837 8.337 12.5 9 12.5H12C12.663 12.5 13 12.837 13 13.5C13 14.163 12.663 14.5 12 14.5H9C8.337 14.5 8 14.163 8 13.5Z" />
                    <path d="M16 10.5C16 9.837 16.337 9.5 17 9.5C17.663 9.5 18 9.837 18 10.5C18 11.163 17.663 11.5 17 11.5C16.337 11.5 16 11.163 16 10.5Z" />
                    <path d="M14 10.5C14 9.837 14.337 9.5 15 9.5C15.663 9.5 16 9.837 16 10.5C16 11.163 15.663 11.5 15 11.5C14.337 11.5 14 11.163 14 10.5Z" />
                    <path d="M8 10.5C8 9.837 8.337 9.5 9 9.5H11C11.663 9.5 12 9.837 12 10.5C12 11.163 11.663 11.5 11 11.5H9C8.337 11.5 8 11.163 8 10.5Z" />
                  </svg>
                  <a
                    href="https://t.me/topmonroe9"
                    target="_blank"
                    rel="noreferrer"
                  >
                    t.me/topmonroe9
                  </a>
                </div>
                <div className="contact-item">
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7" />
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                  </svg>
                  <a href="mailto:esemenchenko0@gmail.com">
                    esemenchenko0@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-info">
                {/* <div className="contact-item" id="location">
                  {strings.location_label}: {strings.location}
                </div> */}
                <div className="contact-item">
                  <a
                    href="https://www.linkedin.com/in/egor-semenchenko/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <a
              href="#"
              className="download-btn"
              onClick={(e) => {
                e.preventDefault();
                handleDownload(language);
              }}
            >
              <span id="download-text">{strings.download_pdf}</span>
            </a>
            <button
              className="print-btn"
              id="print-pdf"
              onClick={() => window.print()}
            >
              <svg
                className="print-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 8V2H18V8" />
                <path d="M6 22H18V16H6V22Z" />
                <path d="M18 14H20V8C20 7.44772 19.5523 7 19 7H5C4.44772 7 4 7.44772 4 8V14H6" />
                <circle cx="8" cy="11" r="1" />
              </svg>
              <span id="print-text">{strings.print}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="language-switch">
        <button
          className={`language-btn ${language === "ru" ? "active" : ""}`}
          onClick={() => setLanguage("ru")}
        >
          RU
        </button>
        <button
          className={`language-btn ${language === "en" ? "active" : ""}`}
          onClick={() => setLanguage("en")}
        >
          EN
        </button>
      </div>
    </header>
  );
}

// Компонент для секции с желаемой должностью
function PositionSection() {
  const { strings } = useContext(LanguageContext);

  return (
    <section className="desired-position">
      <div className="container">
        <div className="position-details">
          <div>
            <div className="position-title" id="desired-position">
              {strings.job_title}
            </div>
            <div className="position-specs" id="position-specs">
              {strings.job_specs.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < strings.job_specs.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="position-salary hidden" id="salary">
            200 000 ₽
          </div>
        </div>
      </div>
    </section>
  );
}

// Компонент для профессионального профиля
function SummarySection() {
  const { strings } = useContext(LanguageContext);

  return (
    <section className="section summary-section">
      <h2 className="section-title">{strings.summary_title}</h2>
      <div className="summary-content">
        {strings.summary_content.split("\n\n").map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            {index < strings.summary_content.split("\n\n").length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

// Компонент для секции мотивации
function MotivationSection() {
  const { strings } = useContext(LanguageContext);

  return (
    <section className="section motivation-section">
      <h2 className="section-title">{strings.motivation_title}</h2>
      <div className="motivation-content">
        {strings.motivation_content.split("\n\n").map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            {index < strings.motivation_content.split("\n\n").length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

// Компонент для раздела навыков
function SkillsSection() {
  const { strings } = useContext(LanguageContext);

  const skillCategories = [
    {
      title: strings.prog_languages,
      skills: ["JavaScript", "TypeScript", "Python", "C#", "HTML/CSS", "Go (learning)"],
    },
    {
      title: strings.backend,
      skills: [
        "Node.js",
        "Express.js",
        "NestJS",
        "REST API",
        "GraphQL",
        "WebSockets",
        "Puppeteer",
      ],
    },
    {
      title: strings.frontend,
      skills: ["React", "Redux", "Tailwind", "Angular", "CSS/SCSS"],
    },
    {
      title: strings.databases,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "NocoDB"],
    },
    {
      title: strings.devops,
      skills: [
        "Docker",
        "AWS",
        "EC2",
        "RDS",
        "S3",
        "Lambda",
        "CloudWatch",
        "Grafana",
        "Prometheus",
        "Yandex Cloud",
        "Linux",
        "CI/CD",
      ],
    },
    {
      title: strings.integrations,
      skills: ["Stripe", "Google APIs", "Jira", "OAuth", "TG API"],
    },
    {
      title: strings.analytics,
      skills: ["Metabase", "Custom BI solutions"],
    },
  ];

  return (
    <section className="section skills-section">
      <h2 className="section-title">{strings.skills_title}</h2>

      <div className="skills-categories">
        {skillCategories.map((category, index) => (
          <div className="skill-category" key={index}>
            <h3 className="category-title">{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, i) => (
                <div className="skill-tag" key={i}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skill-category soft-skills">
        <h3 className="category-title">{strings.soft_skills}</h3>
        <div className="soft-skills-alternative">
          <div className="soft-skills-row">
            <div className="soft-skill-card">
              <div className="soft-skill-title">
                🤝 {strings.client_communication}
              </div>
              <div className="soft-skill-description">
                {strings.client_communication_desc}
              </div>
            </div>
            <div className="soft-skill-card">
              <div className="soft-skill-title">
                👥 {strings.team_leadership}
              </div>
              <div className="soft-skill-description">
                {strings.team_leadership_desc}
              </div>
            </div>
          </div>
          <div className="soft-skills-row">
            <div className="soft-skill-card">
              <div className="soft-skill-title">
                🔍 {strings.conflict_resolution}
              </div>
              <div className="soft-skill-description">
                {strings.conflict_resolution_desc}
              </div>
            </div>
            <div className="soft-skill-card">
              <div className="soft-skill-title">
                ⚡ {strings.crisis_management}
              </div>
              <div className="soft-skill-description">
                {strings.crisis_management_desc}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="languages">
        <div className="language-item">
          <div className="language-name">{strings.russian}</div>—
          <div>{strings.native}</div>
        </div>
        <div className="language-item">
          <div className="language-name">{strings.english}</div>—
          <div>{strings.advanced}</div>
        </div>
      </div>
    </section>
  );
}

// Компонент для достижений
function AchievementsSection() {
  const { strings } = useContext(LanguageContext);

  const achievements = [
    {
      icon: "📈",
      title: strings.achievement1_title,
      description: strings.achievement1_desc,
    },
    // {
    //   icon: "🚀",
    //   title: strings.achievement2_title,
    //   description: strings.achievement2_desc,
    // },
    {
      icon: "👥",
      title: strings.achievement3_title,
      description: strings.achievement3_desc,
    },
    {
      icon: "💼",
      title: strings.achievement4_title,
      description: strings.achievement4_desc,
    },
  ];

  return (
    <section className="section achievements-section">
      <h2 className="section-title">{strings.achievements_title}</h2>
      <div className="achievements-list">
        {achievements.map((achievement, index) => (
          <div className="achievement-item" key={index}>
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-content">
              <div className="achievement-title">{achievement.title}</div>
              <div className="achievement-description">
                {achievement.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Компонент для кейсов
function CaseStudiesSection() {
  const { strings } = useContext(LanguageContext);

  const caseStudies = [
    {
      title: strings.case1_title,
      paragraphs: [strings.case1_p1, strings.case1_p2],
    },
    {
      title: strings.case2_title,
      paragraphs: [strings.case2_p1, strings.case2_p2],
    },
    {
      title: strings.case3_title,
      paragraphs: [strings.case3_p1, strings.case3_p2],
    },
  ];

  return (
    <section className="section case-studies-section">
      <h2 className="section-title">{strings.case_studies_title}</h2>

      {caseStudies.map((caseStudy, index) => (
        <div className="case-study" key={index}>
          <h3 className="case-study-title">{caseStudy.title}</h3>
          <div className="case-study-content">
            {caseStudy.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

// Компонент секции портфолио
function PortfolioSection() {
  const { strings } = useContext(LanguageContext);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="section portfolio-section">
      <h2 className="section-title">{strings.portfolio_title}</h2>
      <div className="portfolio-grid">
        {portfolioProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            strings={strings}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          strings={strings}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

// Компонент карточки проекта
function ProjectCard({ project, strings, onClick }) {
  const title = strings[`portfolio_${project.id}_title`];
  const shortDesc = strings[`portfolio_${project.id}_short`];
  const maxTechDisplay = 4;
  const remainingTech = project.techStack.length - maxTechDisplay;
  const [imageError, setImageError] = useState(false);

  const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23f0f0f0' width='400' height='200'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='14' x='50%25' y='45%25' text-anchor='middle'%3E${encodeURIComponent(title)}%3C/text%3E%3Ctext fill='%23bbb' font-family='sans-serif' font-size='12' x='50%25' y='55%25' text-anchor='middle'%3EScreenshot coming soon%3C/text%3E%3C/svg%3E`;

  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-card-image">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={imageError ? placeholderSvg : project.images[0]}
            alt={title}
            onError={() => setImageError(true)}
          />
        )}
        <div className="project-card-overlay">
          <span>{strings.portfolio_view_project}</span>
        </div>
      </div>
      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{shortDesc}</p>
        <div className="project-card-tech">
          {project.techStack.slice(0, maxTechDisplay).map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
          {remainingTech > 0 && (
            <span className="tech-badge more">+{remainingTech}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Компонент модального окна проекта
function ProjectModal({ project, strings, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showEmbed, setShowEmbed] = useState(!!project.embedUrl);

  const title = strings[`portfolio_${project.id}_title`];
  const description = strings[`portfolio_${project.id}_desc`];

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project.images.length]);

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  }, [project.images.length]);

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (!showEmbed && e.key === 'ArrowLeft') {
        handlePrev();
      } else if (!showEmbed && e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, handlePrev, handleNext, showEmbed]);

  // Закрытие при клике на backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Форматирование описания с поддержкой **жирного** текста
  const formatDescription = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="portfolio-modal-backdrop" onClick={handleBackdropClick}>
      <div className="portfolio-modal">
        <button className="modal-close-btn" onClick={onClose} aria-label={strings.portfolio_close}>
          &times;
        </button>

        {/* Галерея изображений или iframe */}
        <div className="modal-gallery">
          {showEmbed && project.embedUrl ? (
            <div className="gallery-embed">
              <iframe
                src={project.embedUrl}
                title={title}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
              <a
                href={project.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="embed-external-link"
              >
                {strings.portfolio_open_external || 'Open in new tab'} ↗
              </a>
            </div>
          ) : project.video ? (
            <div className="gallery-main gallery-video">
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                controls
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
          ) : (
            <>
              <div className="gallery-main">
                <button
                  className="gallery-nav prev"
                  onClick={handlePrev}
                  aria-label={strings.portfolio_prev}
                >
                  &#8249;
                </button>
                <img
                  src={project.images[activeImageIndex]}
                  alt={`${title} - ${activeImageIndex + 1}`}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
                  }}
                />
                <button
                  className="gallery-nav next"
                  onClick={handleNext}
                  aria-label={strings.portfolio_next}
                >
                  &#8250;
                </button>
              </div>
              <div className="gallery-dots">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    className={`gallery-dot ${index === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Детали проекта */}
        <div className="modal-details">
          <h2 className="modal-title">{title}</h2>
          <div className="modal-year">{project.year}</div>
          <div className="modal-description">
            {formatDescription(description)}
          </div>

          <div className="modal-tech-section">
            <h3 className="modal-tech-title">{strings.portfolio_tech_stack}</h3>
            <div className="modal-tech-badges">
              {project.techStack.map((tech, index) => (
                <span key={index} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(project.links.demo || project.links.github) && (
            <div className="modal-links">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link primary"
                >
                  Demo
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link secondary"
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Компонент для опыта работы
function ExperienceSection() {
  const { strings } = useContext(LanguageContext);

  const jobExperiences = [
    {
      title: strings.job1_title,
      date: strings.job1_date,
      company: strings.job1_company,
      location: strings.job1_location,
      stack: strings.job1_stack,
      bullets: [
        strings.job1_bullet1,
        strings.job1_bullet2,
        strings.job1_bullet3,
        strings.job1_bullet4,
        strings.job1_bullet5,
        strings.job1_bullet6,
        strings.job1_bullet7,
        strings.job1_bullet8,
        strings.job1_bullet9,
        strings.job1_bullet10,
        strings.job1_bullet11,
        strings.job1_bullet12,
        strings.job1_bullet13,
        strings.job1_bullet14,
      ],
    },
    {
      title: strings.job2_title,
      date: strings.job2_date,
      company: strings.job2_company,
      description: strings.job2_description,
      stack: strings.job2_stack,
      bullets: [
        strings.job2_bullet1,
        strings.job2_bullet2,
        strings.job2_bullet3,
        strings.job2_bullet4,
        strings.job2_bullet5,
        strings.job2_bullet6,
      ],
    },
    {
      title: strings.job3_title,
      date: strings.job3_date,
      company: strings.job3_company,
      industry: strings.job3_industry,
      description: strings.job3_description,
      bullets: [
        strings.job3_bullet1,
        strings.job3_bullet2,
        strings.job3_bullet3,
        strings.job3_bullet4,
        strings.job3_bullet5,
      ],
    },
    {
      title: strings.job4_title,
      date: strings.job4_date,
      company: strings.job4_company,
      stack: strings.job4_stack,
      bullets: [
        strings.job4_bullet1,
        strings.job4_bullet2,
        strings.job4_bullet3,
        strings.job4_bullet4,
        strings.job4_bullet5,
      ],
      projects: strings.job4_projects,
    },
    {
      title: strings.job5_title,
      date: strings.job5_date,
      company: strings.job5_company,
      location: strings.job5_location,
      industry: strings.job5_industry,
      bullets: [
        strings.job5_bullet1,
        strings.job5_bullet2,
        strings.job5_bullet3,
        strings.job5_bullet4,
      ],
    },
    {
      title: strings.job6_title,
      date: strings.job6_date,
      company: strings.job6_company,
      bullets: [
        strings.job6_bullet1,
        strings.job6_bullet2,
        strings.job6_bullet3,
        strings.job6_bullet4,
      ],
    },
  ];

  return (
    <section className="section experience-section">
      <h2 className="section-title">{strings.experience_title}</h2>

      {jobExperiences.map((job, index) => (
        <div className="work-item" key={index}>
          <div className="work-header">
            <div className="work-title">{job.title}</div>
            <div className="work-date">{job.date}</div>
          </div>
          <div className="work-company">{job.company}</div>

          {/* {job.location && <div className="work-location">{job.location}</div>} */}

          {job.industry && (
            <div className="work-industry">
              {job.industry.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < job.industry.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          )}

          {job.stack && <div className="tech-stack">{job.stack}</div>}

          {job.description && <div className="work-intro">{job.description}</div>}

          <div className="work-description">
            {job.note && <p className="work-note">{job.note}</p>}
            <ul className="work-bullets">
              {job.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>

          {job.projects && (
            <div className="projects">
              {job.projects.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < job.projects.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

// Компонент для образования
function EducationSection() {
  const { strings } = useContext(LanguageContext);

  const books = [
    {
      title: strings.book1_title,
      author: strings.book1_author,
      application: strings.book1_application,
    },
    {
      title: strings.book2_title,
      author: strings.book2_author,
      application: strings.book2_application,
    },
    {
      title: strings.book3_title,
      author: strings.book3_author,
      application: strings.book3_application,
    },
  ];

  const certifications = [
    {
      year: strings.certification1_year,
      name: strings.certification1_name,
      provider: strings.certification1_provider,
    },
    {
      year: strings.certification2_year,
      name: strings.certification2_name,
      provider: strings.certification2_provider,
    },
  ];

  return (
    <section className="section education-section">
      <h2 className="section-title">{strings.education_title}</h2>
      <div className="education-item">
        <div className="education-level">{strings.education_level}</div>
        <div className="education-year">2022</div>
        <div className="education-name">{strings.university_name}</div>
        <div className="education-specialization">{strings.education_spec}</div>
      </div>

      <div className="professional-development">
        <h3 className="subsection-title">{strings.professional_reading}</h3>
        <div className="book-list">
          {books.map((book, index) => (
            <div className="book-item" key={index}>
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.author}</div>
              <div className="book-application">{book.application}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="certifications">
        <h3 className="subsection-title">{strings.certifications}</h3>
        {certifications.map((cert, index) => (
          <div className="certification-item" key={index}>
            <div className="certification-year">{cert.year}</div>
            <div className="certification-name">{cert.name}</div>
            <div className="certification-provider">{cert.provider}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Компонент для раздела "Обо мне"
function AboutSection() {
  const { strings } = useContext(LanguageContext);

  return (
    <section className="section">
      <h2 className="section-title">{strings.about_title}</h2>
      <div className="about-me">
        {strings.about_me.split("\n\n").map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            {index < strings.about_me.split("\n\n").length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function handleDownload(language) {
  const fileName =
    language === "en"
      ? "Egor Semenchenko NodeJS.pdf"
      : "Егор Семенченко NodeJS.pdf";

  // Create a link element
  const link = document.createElement("a");
  link.href = fileName;
  link.download = fileName;

  // Append to the document
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Clean up
  document.body.removeChild(link);
}

export default ResumeApp;
