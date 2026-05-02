import { useEffect, useState } from 'react'
import './Portfolio.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const techStack = [
  {
    category: 'Languages & Frameworks',
    items: ['ASP.NET Core', 'C#', 'React.js', 'AngularJS', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    category: 'Databases',
    items: ['SQL Server', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'Messaging & Streaming',
    items: ['RabbitMQ'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Docker', 'Kubernetes', 'Azure', 'Azure DevOps'],
  },
  {
    category: 'Architecture',
    items: ['Microservices', 'CQRS', 'Repository Pattern', 'Event-Driven', 'RESTful APIs'],
  },
  {
    category: 'Version Control',
    items: ['Git', 'GitHub', 'Azure DevOps'],
  },
]

const experience = [
  {
    period: 'Jan 2023 — Present',
    role: 'Senior Software Engineer',
    company: 'Technonext Software Limited',
    location: 'Dhaka, Bangladesh',
    bullets: [
      'Designed and developed enterprise-level applications using ASP.NET Core and RabbitMQ.',
      'Led a team of developers to build scalable microservices architectures.',
      'Integrated React.js for dynamic and responsive UI components.',
      'Implemented the Repository Pattern for clean and maintainable code structure.',
      'Improved system performance by 30% through optimized database queries and caching strategies.',
    ],
    tags: ['ASP.NET Core', 'RabbitMQ', 'React.js', 'Microservices', 'Docker', 'Azure'],
  },
  {
    period: 'Jan 2021 — Dec 2022',
    role: 'Senior Software Engineer',
    company: 'Decode Lab',
    location: 'Dhaka, Bangladesh',
    bullets: [
      'Developed enterprise software solutions using ASP.NET Core and React.js.',
      'Led software development teams in delivering high-quality projects.',
    ],
    tags: ['ASP.NET Core', 'React.js', 'C#'],
  },
  {
    period: 'Mar 2020 — Dec 2020',
    role: 'Lead Software Engineer',
    company: 'Property Bazaar Ltd',
    location: 'Dhaka, Bangladesh',
    bullets: [
      'Architected and developed in-house applications including e-commerce platforms.',
      'Designed and implemented RESTful APIs using ASP.NET Web API.',
      'Managed a cross-functional team with diverse tech stacks.',
    ],
    tags: ['ASP.NET Web API', 'RESTful APIs', 'E-commerce'],
  },
  {
    period: 'Apr 2016 — Feb 2020',
    role: 'Software Developer',
    company: 'Accentech Pvt. Ltd',
    location: 'Dhaka, Bangladesh',
    bullets: [
      'Developed inventory management systems using ASP.NET MVC, AngularJS, and SQL Server.',
      'Designed database structures and optimized queries for high performance.',
      'Built mobile applications using Xamarin and Android.',
    ],
    tags: ['ASP.NET MVC', 'AngularJS', 'SQL Server', 'Xamarin', 'Android'],
  },
]

const education = [
  {
    degree: 'MEngg in Information Technology',
    institution: 'Jahangirnagar University',
    year: '2015',
  },
  {
    degree: 'B.Sc. in Information and Communication Technology',
    institution: 'Mawlana Bhashani Science & Technology University',
    year: '2014',
  },
]

const certifications = [
  { title: 'Object-Oriented Programming & ASP.NET MVC', issuer: 'BASIS', year: '2014' },
  { title: 'Object-Oriented Programming with ASP.NET', issuer: 'BITM', year: '2015' },
]

const projects = [
  {
    title: 'Project Name',
    desc: 'A brief description of what this project does and the problem it solves. Add your real projects here.',
    tags: ['ASP.NET Core', 'RabbitMQ', 'Docker'],
    github: '#',
    link: '#',
  },
  {
    title: 'Project Name',
    desc: 'A brief description of what this project does and the problem it solves. Add your real projects here.',
    tags: ['React.js', 'ASP.NET Core', 'SQL Server'],
    github: '#',
    link: '#',
  },
  {
    title: 'Project Name',
    desc: 'A brief description of what this project does and the problem it solves. Add your real projects here.',
    tags: ['Microservices', 'RabbitMQ', 'Kubernetes'],
    github: '#',
    link: '#',
  },
]

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#hero" className="navbar-logo">
          <span className="logo-bracket">&lt;</span>SA<span className="logo-bracket"> /&gt;</span>
        </a>
        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">Sabbir Ahmed</h1>
        <h2 className="hero-title">Senior Software Engineer</h2>
        <p className="hero-desc">
          10 years building enterprise-grade applications and distributed systems. Specializing in{' '}
          <span className="hl">ASP.NET Core</span>,{' '}
          <span className="hl">RabbitMQ</span>, and{' '}
          <span className="hl">Microservices architecture</span>.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-ghost">Get in Touch</a>
        </div>
        <span className="badge-available">● Available for opportunities</span>
      </div>
      <div className="hero-scroll">
        <span>scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-num">01.</span> About Me
        </h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a results-driven Senior Software Engineer with <strong>10 years of experience</strong> in
              ASP.NET Core, C#, RabbitMQ, and PostgreSQL. I'm skilled in designing scalable architectures,
              leading development teams, and integrating modern technologies into enterprise applications.
            </p>
            <p>
              I'm passionate about software engineering best practices, <strong>microservices</strong>, and
              event-driven systems. I enjoy solving complex problems — from designing clean domain models
              to optimizing high-throughput database queries and building resilient messaging pipelines.
            </p>
            <p>
              Outside of engineering, I was President of the MBSTU Photography Society and General
              Secretary of the MBSTU Science Club — experiences that shaped my team leadership and
              community-building skills.
            </p>
          </div>
          <div className="about-stats">
            {[
              { num: '10',   label: 'Years of Experience' },
              { num: '.NET', label: 'Core Ecosystem' },
              { num: 'MQ',   label: 'RabbitMQ & Events' },
              { num: 'μSvc', label: 'Microservices' },
            ].map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-num">02.</span> Tech Stack
        </h2>
        <div className="skills-grid">
          {techStack.map((group) => (
            <div className="skill-group" key={group.category}>
              <h3 className="skill-category">{group.category}</h3>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span className="skill-tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-num">03.</span> Experience
        </h2>
        <div className="timeline">
          {experience.map((job, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-marker">
                <div className="timeline-dot" />
                {i < experience.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="timeline-period">{job.period}</span>
                  <span className="timeline-location">{job.location}</span>
                </div>
                <h3 className="timeline-role">{job.role}</h3>
                <p className="timeline-company">{job.company}</p>
                <ul className="timeline-bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                <div className="timeline-tags">
                  {job.tags.map((t) => <span className="skill-tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-num">04.</span> Projects
        </h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div className="project-card" key={i}>
              <div className="project-header">
                <svg className="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
                <div className="project-links">
                  <a href={p.github} aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <a href={p.link} aria-label="External link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span className="project-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Education ────────────────────────────────────────────────────────────────

function Education() {
  return (
    <section className="section" id="education">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-num">05.</span> Education & Certifications
        </h2>
        <div className="edu-grid">
          <div>
            <h3 className="edu-group-title">Academic</h3>
            <div className="edu-list">
              {education.map((e) => (
                <div className="edu-card" key={e.degree}>
                  <span className="edu-year">{e.year}</span>
                  <div>
                    <p className="edu-degree">{e.degree}</p>
                    <p className="edu-institution">{e.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="edu-group-title">Certifications & Training</h3>
            <div className="edu-list">
              {certifications.map((c) => (
                <div className="edu-card" key={c.title}>
                  <span className="edu-year">{c.year}</span>
                  <div>
                    <p className="edu-degree">{c.title}</p>
                    <p className="edu-institution">{c.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section className="section section-alt" id="contact">
      <div className="section-inner contact-inner">
        <span className="section-num contact-eyebrow">06. What's Next?</span>
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-desc">
          I'm always open to discussing new projects, interesting ideas, or opportunities.
          Feel free to reach out — I'll get back to you.
        </p>
        <a href="mailto:shawon.ict@gmail.com" className="btn btn-primary">Say Hello</a>
        <div className="social-links">
          <a href="https://github.com/sabbirongithub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="mailto:shawon.ict@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <p>Designed & Built by <strong>Sabbir Ahmed</strong></p>
      <p className="footer-sub">React + Vite · Deployed on GitHub Pages</p>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div className="portfolio">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
