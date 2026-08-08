'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from '@/i18n/routing';

export default function PortfolioContent({ projects = [] }: { projects?: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const t = useTranslations();
  const locale = useLocale();

  // Load theme from localStorage on mount
  useEffect(() => {
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
      if (savedTheme) {
          setTheme(savedTheme);
      }
  }, []);

  const getL = (field: any) => {
    if (typeof field === 'string') return field;
    if (!field) return '';
    return field[locale] || field.en || Object.values(field)[0] || '';
  };

  const getList = (field: any) => {
    if (Array.isArray(field)) {
        if (field.length > 0 && typeof field[0] === 'string') return field;
        return [];
    }
    if (typeof field === 'object' && field !== null) return field[locale] || field.en || [];
    return [];
  };

  const [formData, setFormData] = useState({ name: '', contactInfo: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to send');
      setFormStatus('success');
      setFormData({ name: '', contactInfo: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    // Check if animations already ran in this session
    const hasAnimated = sessionStorage.getItem('hasAnimated');
    if (hasAnimated) {
        document.body.classList.add('animations-done');
    } else {
        sessionStorage.setItem('hasAnimated', 'true');
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // Header scroll effect
    const nav = document.querySelector('nav');
    const handleScroll = () => {
        if (!nav) return;
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    };
    
    // Initialize immediately to ensure dark background is applied
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
        document.body.classList.add('theme-light');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('theme-light');
        localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  return (
    <>
      <main className="min-h-screen relative overflow-hidden">
        {/* Global Background Blobs */}
        <div className="global-bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob-4"></div>
          <div className="blob-5"></div>
        </div>

        <nav>
        <div className="container nav-content">
            <a href="#" className="logo">
                <div className="logo-dot"></div>
                Shohjaxon Hakimov
            </a>
            <button className="menu-btn" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? '✕' : '☰'}
            </button>
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>{t('Navigation.about')}</a>
                <a href="#skills" onClick={() => setIsMenuOpen(false)}>{t('Navigation.expertise')}</a>
                <a href="#projects" onClick={() => setIsMenuOpen(false)}>{t('Navigation.projects')}</a>
                <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>{t('Navigation.testimonials')}</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t('Navigation.contact')}</a>
                <LanguageSwitcher />
                <div className="flex items-center gap-1 border-l border-slate-700 pl-4 ml-2">
                    <button onClick={() => setTheme('light')} className={`p-1.5 rounded-md hover:bg-slate-800 transition-colors ${theme === 'light' ? 'text-yellow-400 bg-slate-800' : 'text-slate-400'}`} aria-label="Light Theme">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </button>
                    <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-md hover:bg-slate-800 transition-colors ${theme === 'dark' ? 'text-blue-400 bg-slate-800' : 'text-slate-400'}`} aria-label="Dark Theme">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                    </button>
                </div>
            </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
            <div className="hero-bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
            <div className="container">
                <div className="hero-content">
                    <span className="section-tag fade-in-up" style={{transitionDelay: '0.1s'}}>{t('Hero.tag')}</span>
                    <h1 className="fade-in-up" style={{transitionDelay: '0.2s'}}>
                        {t('Hero.title1')}<span className="text-gradient">{t('Hero.title_highlight')}</span>
                    </h1>
                    <p className="hero-subtitle fade-in-up" style={{transitionDelay: '0.3s'}}>
                        {t('Hero.subtitle')}
                    </p>
                    <div className="btn-group fade-in-up" style={{transitionDelay: '0.4s'}}>
                        <a href="#contact" className="btn btn-primary">{t('Hero.btn_primary')}</a>
                        <a href="#projects" className="btn btn-secondary">{t('Hero.btn_secondary')}</a>
                    </div>
                    
                    <div className="metrics-grid fade-in-up" style={{transitionDelay: '0.5s'}}>
                        <div className="metric-card">
                            <div className="metric-value">9+</div>
                            <div className="metric-label">{t('Hero.metrics.years')}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-value">99.95%</div>
                            <div className="metric-label">{t('Hero.metrics.uptime')}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-value">12M+</div>
                            <div className="metric-label">{t('Hero.metrics.users')}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-value">60M+</div>
                            <div className="metric-label">{t('Hero.metrics.requests')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="container">
            <div className="section-header fade-in-up">
                <span className="section-tag">{t('About.tag')}</span>
                <h2>{t('About.title')}</h2>
            </div>
            <div className="about-grid fade-in-up">
                <div>
                    <p className="about-bio">{t('About.bio1')}</p>
                    <p className="about-bio">{t('About.bio2')}</p>

                    <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)', border: '1px dashed rgba(6, 182, 212, 0.3)', borderRadius: '12px' }}>
                        <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '8px', fontSize: '18px' }}>{t('About.projects_title')}</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>{t('About.projects_desc')}</p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li>
                                <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: 'var(--accent-cyan)' }}>→</span> {t('About.add_project')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <ul className="expertise-list">
                        <li>
                            <svg className="check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <div>
                                <h4>{t('About.expertise.arch_title')}</h4>
                                <p className="text-small">{t('About.expertise.arch_desc')}</p>
                            </div>
                        </li>
                        <li>
                            <svg className="check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <div>
                                <h4>{t('About.expertise.lead_title')}</h4>
                                <p className="text-small">{t('About.expertise.lead_desc')}</p>
                            </div>
                        </li>
                        <li>
                            <svg className="check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <div>
                                <h4>{t('About.expertise.perf_title')}</h4>
                                <p className="text-small">{t('About.expertise.perf_desc')}</p>
                            </div>
                        </li>
                        <li>
                            <svg className="check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <div>
                                <h4>{t('About.expertise.cloud_title')}</h4>
                                <p className="text-small">{t('About.expertise.cloud_desc')}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container">
            <div className="section-header fade-in-up">
                <span className="section-tag">{t('Skills.tag')}</span>
                <h2>{t('Skills.title')}</h2>
            </div>
            <div className="skills-grid">
                <div className="glass-card fade-in-up">
                    <h3 className="skill-category">{t('Skills.cat_backend')}</h3>
                    <div className="skill-tags mono">
                        <span className="skill-tag">Node.js</span>
                        <span className="skill-tag">Python (FastAPI)</span>
                        <span className="skill-tag">PostgreSQL</span>
                        <span className="skill-tag">MongoDB</span>
                        <span className="skill-tag">Redis</span>
                        <span className="skill-tag">RabbitMQ</span>
                        <span className="skill-tag">Apache Kafka</span>
                        <span className="skill-tag">GraphQL</span>
                        <span className="skill-tag">REST APIs</span>
                    </div>
                </div>
                <div className="glass-card fade-in-up" style={{transitionDelay: '0.1s'}}>
                    <h3 className="skill-category">{t('Skills.cat_frontend')}</h3>
                    <div className="skill-tags mono">
                        <span className="skill-tag">React 18+</span>
                        <span className="skill-tag">Next.js</span>
                        <span className="skill-tag">TypeScript</span>
                        <span className="skill-tag">Tailwind CSS</span>
                        <span className="skill-tag">React Query</span>
                        <span className="skill-tag">Zustand</span>
                        <span className="skill-tag">Redux Toolkit</span>
                    </div>
                </div>
                <div className="glass-card fade-in-up" style={{transitionDelay: '0.2s'}}>
                    <h3 className="skill-category">{t('Skills.cat_devops')}</h3>
                    <div className="skill-tags mono">
                        <span className="skill-tag">AWS Architecture</span>
                        <span className="skill-tag">Kubernetes</span>
                        <span className="skill-tag">Docker</span>
                        <span className="skill-tag">Terraform</span>
                        <span className="skill-tag">GitHub Actions</span>
                        <span className="skill-tag">Prometheus</span>
                        <span className="skill-tag">Grafana</span>
                        <span className="skill-tag">Datadog</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container">
            <div className="section-header fade-in-up">
                <span className="section-tag">{t('Projects.tag')}</span>
                <h2>{t('Projects.title')}</h2>
            </div>
            
            <div className="projects-stack">
                {projects.length === 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="glass-card flex flex-col p-0 overflow-hidden bg-[rgba(15,23,42,0.4)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 border border-white/10 rounded-3xl fade-in-up">
                            {/* Image Header */}
                            <div className="relative h-56 w-full bg-slate-800">
                                <img src="/projects/gym/media__1785821389171.png" alt="Sport Zal" className="w-full h-full object-cover opacity-95" />
                                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                    Featured Case Study
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="mb-2 text-slate-400 font-bold uppercase tracking-wider text-xs">
                                    {getL({
                                        en: "1- Project",
                                        uz: "1- Loyiha",
                                        ru: "1- Проект"
                                    })}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {getL({
                                        en: "Gym Management System",
                                        uz: "Sport Zal Boshqaruv Tizimi",
                                        ru: "Система Управления Тренажерным Залом"
                                    })}
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                                    {getL({
                                        en: "A fully automated gym management system with Click integration and employee payroll calculation. Through this system, you can manage clients, accept payments, and control inventory.",
                                        uz: "Click integratsiyasi va xodimlar maoshi hisobi bilan to'liq avtomatlashtirilgan sport zal boshqaruv tizimi. Ushbu tizim orqali mijozlarni boshqarish, to'lovlarni qabul qilish va omborni nazorat qilish mumkin.",
                                        ru: "Полностью автоматизированная система управления тренажерным залом с интеграцией Click и расчетом заработной платы сотрудников. Через эту систему можно управлять клиентами, принимать платежи и контролировать склад."
                                    })}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Prisma'].map(tech => (
                                        <span key={tech} className="bg-blue-900/50 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="grid grid-cols-2 gap-6 mt-auto pt-8">
                                    <a href="#" className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white text-lg font-extrabold tracking-wide py-5 px-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" style={{ clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)' }}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                        GitHub Code
                                    </a>
                                    <Link href="/projects/gym/demo" className="relative group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-lg font-extrabold tracking-wide py-5 px-6 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden" style={{ clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)' }}>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                        <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                        <span className="relative z-10">Live Demo</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    projects.map((project: any, i: number) => {
                        const title = getL(project.title);
                        const role = getL(project.role);
                        const context = getL(project.context);
                        const solution = getL(project.solution_overview);
                        const achievements = getList(project.key_achievements);

                        return (
                        <div key={project.id} className="glass-card project-card fade-in-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                            <div className="project-header">
                                <div>
                                    <h3 className="project-title">{title}</h3>
                                    <div className="project-role">{role}</div>
                                </div>
                                {(project.live_url || project.repo_url) && (
                                    <div className="flex gap-4 items-center">
                                        {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">{t('Projects.live_site')}</a>}
                                        {project.repo_url && <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 text-sm font-medium">{t('Projects.github')}</a>}
                                    </div>
                                )}
                            </div>
                            
                            <div className="project-meta mono">
                                {context && <span>{context}</span>}
                                {context && (project.status || project.team_size) && <span>•</span>}
                                {project.status && <span>{project.status}</span>}
                                {project.status && project.team_size && <span>•</span>}
                                {project.team_size && <span>{project.team_size}</span>}
                            </div>
                            
                            {solution && (
                                <p className="project-description">
                                    {solution}
                                </p>
                            )}
                            
                            {achievements && achievements.length > 0 && (
                                <ul className="achievements-list">
                                    {achievements.map((ach: string, achIdx: number) => (
                                        <li key={achIdx}>
                                            <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                            <span>{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            
                            {project.tech_stack && project.tech_stack.length > 0 && (
                                <div className="project-tech mono">
                                    {project.tech_stack.map((tech: string, techIdx: number) => (
                                        <span key={techIdx} className="skill-tag">{tech}</span>
                                    ))}
                                </div>
                            )}
                            <Link href={`/projects/${project.id}`} className="text-cyan-600 hover:text-cyan-800 font-bold mt-4 inline-block text-lg underline underline-offset-4 decoration-cyan-300">Loyiha rasmlarini va batafsil ma'lumotni ko'rish &rarr;</Link>
                        </div>
                    )})
                )}
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="container">
            <div className="section-header fade-in-up">
                <span className="section-tag">{t('Testimonials.tag')}</span>
                <h2>{t('Testimonials.title')}</h2>
            </div>
            <div className="testimonials-grid">
                <div className="glass-card testimonial-card fade-in-up">
                    <p className="quote">{t('Testimonials.quote1')}</p>
                    <div className="author">
                        <div className="avatar">EV</div>
                        <div className="author-info">
                            <h4>Elena Voss</h4>
                            <p>VP Engineering, NorthPeak Logistics</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card testimonial-card fade-in-up" style={{transitionDelay: '0.1s'}}>
                    <p className="quote">{t('Testimonials.quote2')}</p>
                    <div className="author">
                        <div className="avatar">MC</div>
                        <div className="author-info">
                            <h4>Marcus Chen</h4>
                            <p>CTO, PayForge</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA / Contact */}
        <section id="contact" className="cta-section">
            <div className="container">
                <div className="cta-panel fade-in-up">
                    <span className="section-tag">{t('Contact.tag')}</span>
                    <h2>{t('Contact.title')}</h2>
                    <p>{t('Contact.desc')}</p>
                    
                    <div className="w-full flex justify-center mt-12">
                        <form onSubmit={handleContactSubmit} className="w-full max-w-xl space-y-6 text-left glass-card">
                            <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('Contact.form_name_label')}</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="contact-input"
                                placeholder={t('Contact.form_name_ph')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('Contact.form_contact_label')}</label>
                            <input 
                                type="text" 
                                required
                                value={formData.contactInfo}
                                onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                                className="contact-input"
                                placeholder={t('Contact.form_contact_ph')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('Contact.form_message_label')}</label>
                            <textarea 
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="contact-input"
                                style={{ resize: 'vertical' }}
                                placeholder={t('Contact.form_message_ph')}
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={formStatus === 'loading'}
                            className="btn btn-primary w-full justify-center mt-4 py-4 text-lg rounded-xl disabled:opacity-50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                        >
                            {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? '✓ Sent Successfully!' : formStatus === 'error' ? '✕ Failed to send' : t('Contact.btn')}
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer>
        <div className="container">
            <p className="mono">{t('Footer.copyright')}</p>
            <div style={{marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '16px'}} className="mono text-small">
                <span>{t('Footer.location')}</span>
                <span>•</span>
                <span>AWS Certified</span>
                <span>•</span>
                <span>CKA Certified</span>
            </div>
        </div>
      </footer>
      </main>
    </>
  );
}
