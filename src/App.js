import React, { useState, useEffect, createContext, useContext } from "react";
import "./styles.css";
import localization from "./localization.js";
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
      skills: ["JavaScript", "TypeScript", "C#", "HTML/CSS", "Go (learning)"],
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
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    },
    {
      title: strings.devops,
      skills: [
        "Docker",
        "AWS",
        "S3",
        "Lambda",
        "Yandex Cloud",
        "Linux",
        "CI/CD",
      ],
    },
    {
      title: strings.integrations,
      skills: ["Stripe", "Google APIs", "Jira", "OAuth", "TG API"],
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

// Компонент для опыта работы
function ExperienceSection() {
  const { strings } = useContext(LanguageContext);

  const jobExperiences = [
    {
      title: strings.job1_title,
      date: strings.job1_date,
      company: strings.job1_company,
      bullets: [
        strings.job1_bullet1,
        strings.job1_bullet2,
        strings.job1_bullet3,
        strings.job1_bullet4,
      ],
    },
    {
      title: strings.job2_title,
      date: strings.job2_date,
      company: strings.job2_company,
      location: strings.job2_location,
      industry: strings.job2_industry,
      bullets: [
        strings.job2_bullet1,
        strings.job2_bullet2,
        strings.job2_bullet3,
        strings.job2_bullet4,
        strings.job2_bullet5,
      ],
    },
    {
      title: strings.job3_title,
      date: strings.job3_date,
      company: strings.job3_company,
      stack: strings.job3_stack,
      bullets: [
        strings.job3_bullet1,
        strings.job3_bullet2,
        strings.job3_bullet3,
        strings.job3_bullet4,
        strings.job3_bullet5,
      ],
      projects: strings.job3_projects,
    },
    {
      title: strings.job4_title,
      date: strings.job4_date,
      company: strings.job4_company,
      note: strings.job4_note,
      bullets: [
        strings.job4_bullet1,
        strings.job4_bullet2,
        strings.job4_bullet3,
        strings.job4_bullet4,
      ],
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

          {job.location && <div className="work-location">{job.location}</div>}

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
