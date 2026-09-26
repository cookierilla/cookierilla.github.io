import { useEffect } from 'react'

const professionalLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/edzl-escoto-a37049294/' },
  { label: 'GitHub', href: 'https://github.com/cookierilla' },
  { label: 'GitHub AUF', href: 'https://github.com/cookierilla-auf' },
]

const projects = [
  {
    id: 'nxtgn-games',
    number: '01',
    title: 'NXTgn Games',
    role: 'Concept development and wireframing',
    description:
      'A collaborative Figma concept for a digital game storefront and top-up platform, designed to make browsing and purchasing game content straightforward.',
    features: ['Storefront discovery', 'Product, cart, and top-up flows', 'Mobile-first wireframes'],
    contribution:
      'Participated in collaborative concept development and wireframing. Exact assigned screens are not claimed.',
    technologies: ['Figma'],
    image: '/projects/nxtgn.webp',
    aspectRatio: '16 / 9',
    imageAlt: 'Three mobile interface wireframes for the NXTgn Games digital storefront.',
    link: 'https://github.com/cookierilla/SIA01-LAB9_2',
    linkLabel: 'View project evidence',
  },
  {
    id: 'double-check',
    number: '02',
    title: 'Double-Check',
    role: 'CRUD development',
    description:
      'A fake-news detection web application that uses suspicious-keyword analysis to support article review and content administration.',
    features: ['Article, category, account, and user administration', 'Keyword-analysis workflow', 'Activity logs and reporting'],
    contribution: 'Implemented CRUD functions for the database-backed application.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    image: '/projects/double-check.webp',
    aspectRatio: '16 / 9',
    imageAlt: 'Double-Check article administration dashboard with filtering and article controls.',
    link: 'https://github.com/cookierilla/testing-doublecheck',
    linkLabel: 'View repository',
  },
  {
    id: 'quali-life',
    number: '03',
    title: 'Quali-Life',
    role: 'CRUD development',
    description:
      'A healthcare platform for booking appointments, viewing medical records, and managing patient information online.',
    features: ['Appointment-booking workflow', 'Medical-record access', 'Patient-information management'],
    contribution: 'Implemented CRUD functions supporting application data and healthcare workflows.',
    technologies: ['Yii Framework', 'PHP', 'MySQL'],
    image: '/projects/quali-life.webp',
    aspectRatio: '16 / 9',
    imageAlt: 'Quali-Life medical clinic landing page with appointment booking and clinic information.',
    link: 'https://github.com/ralphfdg/Quali-Life-Clinic',
    linkLabel: 'View repository',
  },
  {
    id: 'securx',
    number: '04',
    title: 'SecurX',
    role: 'Frontend development',
    description:
      'A secure digital-prescription platform connecting patients, doctors, and clinic administrators through cryptographically locked prescriptions.',
    features: ['Tamper-resistant digital prescriptions', 'Instant verification workflow', 'Responsive access across devices'],
    contribution: 'Developed frontend views and interface components for the team project.',
    technologies: ['Laravel Blade', 'PHP', 'JavaScript', 'CSS'],
    image: '/projects/securx.webp',
    aspectRatio: '1896 / 922',
    imageAlt: 'SecurX landing page presenting secure, tamper-proof digital prescriptions.',
    link: 'https://github.com/cookierilla-auf/sam10-staticwebsite',
    linkLabel: 'View portfolio source',
  },
]

const skillGroups = [
  {
    number: '01',
    title: 'Frontend',
    text: 'Interfaces that feel clear, responsive, and deliberate.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    number: '02',
    title: 'Backend and data',
    text: 'Practical application logic supported by structured data.',
    skills: ['PHP', 'Laravel', 'MySQL'],
  },
  {
    number: '03',
    title: 'Workflow and design',
    text: 'Collaborative tools for turning ideas into working products.',
    skills: ['Git', 'GitHub', 'Figma'],
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="m11 9-7 7 7 7M21 9l7 7-7 7M18.5 5 13.5 27" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function useScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const parallaxItems = [...document.querySelectorAll('[data-parallax]')]
    const revealItems = [...document.querySelectorAll('[data-reveal]')]
    let frame = 0

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    revealItems.forEach((item) => revealObserver.observe(item))

    const initialHashTarget = window.location.hash && document.getElementById(window.location.hash.slice(1))
    if (initialHashTarget) {
      window.requestAnimationFrame(() => initialHashTarget.scrollIntoView({ block: 'start' }))
    }

    const updateParallax = () => {
      frame = 0
      if (reduceMotion.matches) {
        parallaxItems.forEach((item) => item.style.setProperty('--parallax-y', '0px'))
        return
      }

      const viewportHeight = window.innerHeight
      const mobileScale = window.innerWidth < 760 ? 0.35 : 1

      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect()
        if (rect.bottom < -100 || rect.top > viewportHeight + 100) return
        const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight
        const speed = Number(item.dataset.speed || 24) * mobileScale
        const offset = Math.max(-speed, Math.min(speed, -progress * speed))
        item.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`)
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    reduceMotion.addEventListener('change', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      reduceMotion.removeEventListener('change', requestUpdate)
      revealObserver.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])
}

function App() {
  useScrollEffects()

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Edzl Escoto portfolio home">
          <span className="brand-mark">EE</span>
          <span className="brand-name">Edzl Escoto</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero shell" id="top" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one" data-parallax data-speed="42" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" data-parallax data-speed="-32" aria-hidden="true" />

          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><span /> Portfolio 2026</p>
            <h1 id="hero-title">
              Edzl Renzo<br />
              <span>M. Escoto</span>
            </h1>
            <p className="hero-role">Aspiring Full Stack Developer</p>
            <p className="hero-summary">
              I build practical, user-centered web experiences that connect thoughtful interfaces with dependable application logic.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore selected work <ArrowIcon /></a>
              <a className="button button-secondary" href="mailto:renzoescoto.04@gmail.com">Email me</a>
            </div>
            <div className="profile-links" aria-label="Professional profiles">
              {professionalLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
              ))}
            </div>
          </div>

          <div className="hero-gallery" aria-label="Selected project previews" data-reveal>
            {projects.map((project, index) => (
              <a
                className={`hero-tile hero-tile-${index + 1}`}
                href={`#${project.id}`}
                key={project.id}
                data-parallax
                data-speed={16 + index * 7}
              >
                <img src={project.image} alt="" width="800" height="450" />
                <span><b>{project.number}</b>{project.title}</span>
              </a>
            ))}
          </div>

          <a className="scroll-cue" href="#skills" aria-label="Scroll to technical skills">
            <span>Scroll to explore</span><i aria-hidden="true" />
          </a>
        </section>

        <section className="skills-section section shell" id="skills" aria-labelledby="skills-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow"><span /> Core capabilities</p>
            <h2 id="skills-title">Building across the stack.</h2>
            <p>From responsive interfaces to database-backed workflows, I focus on the pieces that turn an idea into a usable product.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title} data-reveal>
                <div className="skill-card-top"><span>{group.number}</span><CodeIcon /></div>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
                <ul>
                  {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section section" id="work" aria-labelledby="work-title">
          <div className="shell section-heading work-heading" data-reveal>
            <p className="eyebrow"><span /> Selected work</p>
            <h2 id="work-title">Four team projects.<br />Four different problems.</h2>
            <p>Each case study identifies the project goal and the contribution I can confidently claim.</p>
          </div>

          <div className="projects">
            {projects.map((project, index) => (
              <article className={`project ${index % 2 ? 'project-reverse' : ''}`} id={project.id} key={project.id}>
                <div className="project-grid shell">
                  <div className="project-visual" data-reveal>
                    <div className="browser-frame">
                      <div className="browser-bar" aria-hidden="true">
                        <span /><span /><span /><b>{project.title.toLowerCase().replaceAll(' ', '-')}.project</b>
                      </div>
                      <div className="image-window" style={{ aspectRatio: project.aspectRatio }}>
                        <img
                          src={project.image}
                          alt={project.imageAlt}
                          width="1600"
                          height="900"
                          loading={index === 0 ? 'eager' : 'lazy'}
                          data-parallax
                          data-speed="6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="project-copy" data-reveal>
                    <div className="project-kicker"><span>{project.number}</span><b>Team project</b></div>
                    <h3>{project.title}</h3>
                    <p className="project-role">{project.role}</p>
                    <p className="project-description">{project.description}</p>

                    <div className="project-detail">
                      <h4>Key features</h4>
                      <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                    </div>
                    <div className="project-detail">
                      <h4>My contribution</h4>
                      <p>{project.contribution}</p>
                    </div>
                    <ul className="tech-list" aria-label={`${project.title} technologies`}>
                      {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                    <a className="text-link" href={project.link} target="_blank" rel="noreferrer">
                      {project.linkLabel}<ArrowIcon />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section section" id="contact" aria-labelledby="contact-title">
          <div className="contact-glow" data-parallax data-speed="48" aria-hidden="true" />
          <div className="contact-inner shell" data-reveal>
            <p className="eyebrow"><span /> Contact</p>
            <h2 id="contact-title">Let&apos;s build something<br />clear and useful.</h2>
            <p>I&apos;m open to entry-level full-stack development opportunities and conversations about practical web projects.</p>
            <div className="contact-actions">
              <a className="button button-primary" href="mailto:renzoescoto.04@gmail.com">renzoescoto.04@gmail.com <ArrowIcon /></a>
              <a className="button button-secondary" href="https://www.linkedin.com/in/edzl-escoto-a37049294/" target="_blank" rel="noreferrer">Connect on LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <p>© 2026 Edzl Renzo M. Escoto</p>
        <div>
          <a href="https://github.com/cookierilla" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/cookierilla-auf" target="_blank" rel="noreferrer">GitHub AUF</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}

export default App
