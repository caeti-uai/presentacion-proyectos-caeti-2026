'use client';

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Boxes,
  BrainCircuit,
  ChevronRight,
  CircleDot,
  Clock3,
  Database,
  FileText,
  GraduationCap,
  Maximize2,
  MessageSquareMore,
  Network,
  RotateCcw,
  Search,
  Sparkles,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Project = {
  id: string;
  title: string;
  director: string;
  researchers: string;
  line: LineKey;
  portrait?: string;
};

type LineKey = 'robotica' | 'software' | 'educacion';

const lines: Record<LineKey, { label: string; short: string; color: string }> = {
  robotica: {
    label: 'Automatización y Robótica',
    short: 'Robótica',
    color: '#ffb13b',
  },
  software: {
    label: 'Ingeniería de Software',
    short: 'Software',
    color: '#54d6c7',
  },
  educacion: {
    label: 'Sociedad del Conocimiento y Tecnologías aplicadas a la Educación',
    short: 'Educación',
    color: '#8da8ff',
  },
};

const projects: Project[] = [
  {
    id: 'TI/26/140',
    title: 'Arquitectura de Software para la Transformación hacia Sistemas Adaptativos Inteligentes',
    director: 'Alejandro Sartorio',
    researchers: 'Silvia Poncio, Soledad Ayala, Alejandro Hernández, María Andrea Guisen',
    line: 'software',
    portrait: '/assets/alejandro-sartorio.png',
  },
  {
    id: 'TI/22/116',
    title: 'Tecnología Arduino aplicada a requerimientos sociales',
    director: 'Pedro López',
    researchers: 'Carlos Niell, Fernando Armas',
    line: 'robotica',
    portrait: '/assets/pedro-lopez.png',
  },
  {
    id: 'TI/22/113',
    title: 'La tecnología blockchain como impulso para la transformación digital de las organizaciones',
    director: 'Alejandro Hernández',
    researchers: 'Pablo Audoglio, Leonardo Prósperi, Claudia Pons, Jorge Kamlofsky',
    line: 'software',
    portrait: '/assets/alejandro-hernandez.png',
  },
  {
    id: 'TI/22/117',
    title: 'Hojas de rutas de aprendizaje aplicadas al desarrollo de software',
    director: 'Alejandro Sartorio',
    researchers: 'Matías Banega, Sebastián Velázquez, Carlos Neil, Marcelo De Vincenzi Zemborain',
    line: 'software',
    portrait: '/assets/alejandro-sartorio.png',
  },
  {
    id: 'TI/20/114',
    title: 'Ciberseguridad, conceptos y aplicaciones',
    director: 'Santiago Roatta',
    researchers: 'Pedro López, María Eugenia Casco',
    line: 'software',
    portrait: '/assets/santiago-roatta.png',
  },
  {
    id: 'TI/26/139',
    title: 'Datawarehouse e IA para indicadores de soft skills',
    director: 'Silvia Poncio',
    researchers: 'Cintia Cuña, Alejandro Sartorio',
    line: 'educacion',
    portrait: '/assets/silvia-poncio.png',
  },
  {
    id: 'TI/25/128',
    title: 'Taxonomía de prompting para optimizar la accesibilidad en sistemas de IA conversacional',
    director: 'María Andrea Guisen',
    researchers: 'Claudia Pons, Christian Parkinson, Alejandro Sartorio',
    line: 'educacion',
    portrait: '/assets/maria-andrea-guisen.png',
  },
  {
    id: 'TI/25/129',
    title: 'Punto tecnológico para la accesibilidad de personas con síndrome de Rett',
    director: 'María Andrea Guisen',
    researchers: 'Claudia Pons, Christian Parkinson, Mauro Soto, Nadia Carolina Ksybala',
    line: 'educacion',
    portrait: '/assets/maria-andrea-guisen.png',
  },
  {
    id: 'TI/22/111',
    title: 'Sitios web educativos e IA: análisis de estándares de usabilidad WCAG',
    director: 'Soledad Ayala',
    researchers: 'Alejandro Hernández, Juliana Carpinetti, Santiago Roatta',
    line: 'educacion',
    portrait: '/assets/soledad-ayala.png',
  },
];

const peoplePortraits = [
  { name: 'María Eugenia Casco', src: '/assets/maria-eugenia-casco.png' },
  { name: 'Santiago Roatta', src: '/assets/santiago-roatta.png' },
  { name: 'Alejandro Sartorio', src: '/assets/alejandro-sartorio.png' },
  { name: 'Alejandro Hernández', src: '/assets/alejandro-hernandez.png' },
  { name: 'Soledad Ayala', src: '/assets/soledad-ayala.png' },
  { name: 'María Andrea Guisen', src: '/assets/maria-andrea-guisen.png' },
  { name: 'Silvia Poncio', src: '/assets/silvia-poncio.png' },
  { name: 'Pedro López', src: '/assets/pedro-lopez.png' },
];

const slideLabels = [
  'Portada',
  'El desafío',
  'Proyecto troncal',
  'Método',
  'Plataforma experimental',
  'Colaboración',
  'Gestión institucional',
  'Capacidades',
  'Líneas de investigación',
  'Mapa de proyectos',
  'Personas y agentes',
  'Hiperproductividad',
  'Cierre',
];

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker">{children}</p>;
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="slide-title">{children}</h2>;
}

function ScreenshotPlaceholder({ type }: { type: 'colaboracion' | 'odoo' }) {
  const collaboration = type === 'colaboracion';
  return (
    <figure className={`real-shot ${collaboration ? 'shot-collab' : 'shot-odoo'}`}>
      <div className="shot-bar">
        <div className="shot-dots"><span /><span /><span /></div>
        <span>{collaboration ? 'Espacio colaborativo' : 'Plataforma de gestión'}</span>
        <span className="shot-awaiting">entorno real</span>
      </div>
      <Image
        src={collaboration ? '/assets/entorno-colaborativo.png' : '/assets/odoo-proyecto-adaptativo.png'}
        alt={collaboration ? 'Entorno colaborativo con personas y agentes conversando' : 'Proyecto de sistemas adaptativos gestionado en Odoo'}
        width={collaboration ? 1065 : 1902}
        height={collaboration ? 871 : 518}
        unoptimized
      />
    </figure>
  );
}

function ProjectCard({ project, onOpen, compact = false }: { project: Project; onOpen: () => void; compact?: boolean }) {
  return (
    <button
      className={`project-card ${compact ? 'compact' : ''}`}
      style={{ '--line-color': lines[project.line].color } as React.CSSProperties}
      onClick={onOpen}
    >
      <span className="project-code">{project.id}</span>
      <strong>{project.title}</strong>
      <span className="project-director">Dirección: {project.director}</span>
      <ChevronRight className="project-arrow" size={18} />
    </button>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const [lineFilter, setLineFilter] = useState<LineKey | 'all'>('all');
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const go = useCallback((next: number) => {
    setProject(null);
    setSlide(Math.min(slideLabels.length - 1, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProject(null);
      if (project) return;
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        setSlide((value) => Math.min(slideLabels.length - 1, value + 1));
      }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        setSlide((value) => Math.max(0, value - 1));
      }
      if (event.key.toLowerCase() === 'f') void document.documentElement.requestFullscreen?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project]);

  const filteredProjects = useMemo(
    () => projects.filter((item) => lineFilter === 'all' || item.line === lineFilter),
    [lineFilter],
  );

  const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const seconds = (elapsed % 60).toString().padStart(2, '0');

  return (
    <main className="presentation-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark"><Network size={19} /></span>
          <div><strong>CAETI</strong><span>UAI · Rosario</span></div>
        </div>
        <div className="progress-track" aria-label={`Diapositiva ${slide + 1} de ${slideLabels.length}`}>
          <span style={{ width: `${((slide + 1) / slideLabels.length) * 100}%` }} />
        </div>
        <div className="top-meta">
          <span className={elapsed > 15 * 60 ? 'timer overtime' : 'timer'}><Clock3 size={15} /> {minutes}:{seconds}</span>
          <button title="Pantalla completa (F)" onClick={() => void document.documentElement.requestFullscreen?.()}><Maximize2 size={18} /></button>
        </div>
      </header>

      <section className="stage" aria-live="polite">
        <div className="slide-key" key={slide}>
          {slide === 0 && (
            <div className="slide cover-slide">
              <div className="cover-grid" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} />)}
              </div>
              <Kicker>Proyectos de investigación · CAETI 2026</Kicker>
              <h1>Arquitectura de Software para la Transformación hacia Sistemas Adaptativos Inteligentes</h1>
              <div className="cover-footer">
                <div><span>Presenta</span><strong>Alejandro Sartorio</strong></div>
                <div><span>Centro de Altos Estudios en Tecnología Informática</span><strong>Universidad Abierta Interamericana</strong></div>
              </div>
            </div>
          )}

          {slide === 1 && (
            <div className="slide challenge-slide">
              <Kicker>El desafío</Kicker>
              <SlideTitle>Los sistemas institucionales necesitan incorporar nuevas capacidades sin detener lo que ya funciona</SlideTitle>
              <div className="transformation-line">
                <div className="system-block legacy"><Database /><span>Sistema consolidado</span><small>Procesos y datos existentes</small></div>
                <div className="adaptation-pulse"><span /><span /><span /><Sparkles /></div>
                <div className="system-block adaptive"><BrainCircuit /><span>Sistema adaptativo</span><small>Nuevos actores y capacidades</small></div>
              </div>
              <p className="speaker-thesis">La transformación debe ser incremental, verificable y compatible con la operación cotidiana.</p>
            </div>
          )}

          {slide === 2 && (
            <div className="slide trunk-slide">
              <Kicker>Proyecto troncal · TI/26/140</Kicker>
              <SlideTitle>Una arquitectura que conecta la investigación con la gestión real del Centro</SlideTitle>
              <div className="trunk-layout">
                <div className="trunk-core"><Network /><span>Arquitectura adaptativa</span><small>Método · capacidades · validación</small></div>
                <div className="trunk-orbits">
                  <span><Bot /> Agentes</span><span><Users /> Personas</span><span><Workflow /> Procesos</span><span><Boxes /> Proyectos</span>
                </div>
              </div>
              <div className="director-strip"><span>Dirección</span><strong>Alejandro Sartorio</strong><span>Ingeniería de Software</span></div>
            </div>
          )}

          {slide === 3 && (
            <div className="slide method-slide">
              <Kicker>La transformación</Kicker>
              <SlideTitle>Capacidades que se incorporan de forma incremental y reproducible</SlideTitle>
              <div className="method-sequence">
                {[
                  ['01', 'Observar', 'Procesos, actores y necesidades'],
                  ['02', 'Incorporar', 'Una nueva capacidad'],
                  ['03', 'Validar', 'Su efecto en el entorno real'],
                  ['04', 'Evolucionar', 'El sistema aprende y se adapta'],
                ].map(([num, title, text], i) => (
                  <div className="method-step" key={num} style={{ animationDelay: `${i * 130}ms` }}>
                    <span>{num}</span><strong>{title}</strong><p>{text}</p>
                  </div>
                ))}
              </div>
              <p className="speaker-thesis">La plataforma experimental permite observar esta evolución mientras el Centro trabaja.</p>
            </div>
          )}

          {slide === 4 && (
            <div className="slide platform-slide">
              <Kicker>Plataforma experimental</Kicker>
              <SlideTitle>Un entorno común para investigar, colaborar y gestionar</SlideTitle>
              <div className="platform-bridge">
                <div><MessageSquareMore /><strong>Espacio colaborativo</strong><span>Personas y agentes conversan, coordinan y producen conocimiento</span></div>
                <div className="bridge-core"><Network /><span>Arquitectura<br />adaptativa</span></div>
                <div><Database /><strong>Gestión institucional</strong><span>Odoo sostiene documentos, trámites, perfiles y procesos</span></div>
              </div>
            </div>
          )}

          {slide === 5 && (
            <div className="slide screenshot-slide">
              <div className="screenshot-copy">
                <Kicker>Espacio colaborativo</Kicker>
                <SlideTitle>La investigación sucede en conversaciones activas</SlideTitle>
                <p>Canales temáticos reúnen a docentes, estudiantes, investigadores y agentes. Cada interacción puede iniciar una tarea, recuperar evidencia o coordinar un proceso.</p>
                <div className="mini-tags"><span>Conversaciones</span><span>Agentes</span><span>Actividad verificable</span></div>
              </div>
              <ScreenshotPlaceholder type="colaboracion" />
            </div>
          )}

          {slide === 6 && (
            <div className="slide screenshot-slide reverse">
              <ScreenshotPlaceholder type="odoo" />
              <div className="screenshot-copy">
                <Kicker>Gestión institucional</Kicker>
                <SlideTitle>La actividad se convierte en procesos trazables</SlideTitle>
                <p>La plataforma de gestión organiza los datos y los circuitos formales que hacen posible la investigación.</p>
                <div className="mini-tags"><span>Formularios</span><span>Flujos</span><span>Trazabilidad</span></div>
              </div>
            </div>
          )}

          {slide === 7 && (
            <div className="slide capabilities-slide">
              <Kicker>Soporte para investigar</Kicker>
              <SlideTitle>Seis capacidades institucionales conectadas</SlideTitle>
              <div className="capability-wheel">
                {[
                  [FileText, 'Gestión documental'], [MessageSquareMore, 'Comunicación institucional'], [Users, 'Gestión de investigadores'],
                  [Workflow, 'Trámites y procesos'], [Database, 'Gestión financiera'], [GraduationCap, 'Capacitación y entrenamiento'],
                ].map(([Icon, label], i) => {
                  const Cmp = Icon as typeof FileText;
                  return <div key={label as string} className="capability" style={{ animationDelay: `${i * 100}ms` }}><Cmp /><span>{label as string}</span></div>;
                })}
                <div className="wheel-center"><Network /><span>Plataforma<br />experimental</span></div>
              </div>
            </div>
          )}

          {slide === 8 && (
            <div className="slide lines-slide">
              <Kicker>CAETI 2026</Kicker>
              <SlideTitle>Tres líneas reúnen los proyectos del Centro</SlideTitle>
              <div className="research-lines">
                {(Object.keys(lines) as LineKey[]).map((key, index) => (
                  <button key={key} style={{ '--line-color': lines[key].color, animationDelay: `${index * 140}ms` } as React.CSSProperties} onClick={() => { setLineFilter(key); go(9); }}>
                    <span className="line-number">0{index + 1}</span>
                    <strong>{lines[key].label}</strong>
                    <span>{projects.filter((p) => p.line === key).length} proyectos</span>
                    <ChevronRight />
                  </button>
                ))}
              </div>
            </div>
          )}

          {slide === 9 && (
            <div className="slide projects-slide">
              <div className="projects-heading">
                <div><Kicker>Mapa vivo del CAETI</Kicker><SlideTitle>Proyectos conectados por una arquitectura común</SlideTitle></div>
                <div className="filters">
                  <button className={lineFilter === 'all' ? 'active' : ''} onClick={() => setLineFilter('all')}>Todos</button>
                  {(Object.keys(lines) as LineKey[]).map((key) => <button key={key} className={lineFilter === key ? 'active' : ''} style={{ '--filter': lines[key].color } as React.CSSProperties} onClick={() => setLineFilter(key)}>{lines[key].short}</button>)}
                </div>
              </div>
              <div className="project-map">
                {filteredProjects.map((item) => <ProjectCard key={item.id} project={item} compact onOpen={() => setProject(item)} />)}
              </div>
              <p className="interaction-hint"><Search size={15} /> Seleccioná un proyecto para ver su equipo</p>
            </div>
          )}

          {slide === 10 && (
            <div className="slide actors-slide">
              <Kicker>Sistema sociotécnico</Kicker>
              <SlideTitle>Personas y agentes aportan capacidades diferentes sobre un mismo entorno</SlideTitle>
              <div className="actor-field">
                <div className="actor-side human-side"><Users /><strong>Personas</strong><span>Formulan preguntas, toman decisiones y validan resultados</span><div className="actor-dots"><i /><i /><i /><i /></div></div>
                <div className="shared-work"><CircleDot /><strong>Trabajo compartido</strong><span>Contexto · evidencia · procesos</span></div>
                <div className="actor-side agent-side"><Bot /><strong>Agentes</strong><span>Buscan, organizan, asisten y ejecutan tareas delimitadas</span><div className="actor-dots"><i /><i /><i /></div></div>
              </div>
              <p className="speaker-thesis">La adaptabilidad emerge de la coordinación entre arquitectura, procesos y participantes.</p>
            </div>
          )}

          {slide === 11 && (
            <div className="slide hiper-slide">
              <div className="hiper-visual">
                <Image src="/assets/hiperproductividad.jpeg" alt="Identidad visual de Hiperproductividad" width={1920} height={1920} unoptimized />
              </div>
              <div className="hiper-copy">
                <Kicker>Una propiedad de la adaptación</Kicker>
                <SlideTitle>La arquitectura adaptativa permite alcanzar hiperproductividad</SlideTitle>
                <p className="hiper-formula"><span>Entornos de agentes</span><i>×</i><span>Trabajo colaborativo tipo Slack</span><i>×</i><span>Gestión institucional tipo Odoo</span><strong>= Hiperproductividad</strong></p>
                <p>La arquitectura articula agentes, conversaciones y procesos de gestión sobre un contexto común. Cada resultado deja evidencia útil para el próximo ciclo de trabajo.</p>
                <a href="https://hiperprodu.asartorio.online/" target="_blank" rel="noreferrer">Explorar Hiperproductividad <ArrowRight size={17} /></a>
              </div>
            </div>
          )}

          {slide === 12 && (
            <div className="slide closing-slide">
              <div className="closing-network" aria-hidden="true"><Network /><span /><span /><span /></div>
              <Kicker>CAETI · UAI</Kicker>
              <SlideTitle>La plataforma convierte al Centro en un laboratorio vivo de sistemas adaptativos</SlideTitle>
              <p>Los proyectos comparten un entorno que sostiene su gestión y, al mismo tiempo, permite investigar nuevas formas de colaboración entre personas, agentes y sistemas.</p>
              <div className="closing-actions">
                <div><strong>9</strong><span>proyectos</span></div><div><strong>3</strong><span>líneas</span></div><div><strong>1</strong><span>entorno común</span></div>
              </div>
              <p className="thanks">Muchas gracias</p>
            </div>
          )}
        </div>
      </section>

      <footer className="controls">
        <button onClick={() => go(slide - 1)} disabled={slide === 0} aria-label="Diapositiva anterior"><ArrowLeft /></button>
        <div className="slide-status"><span>{String(slide + 1).padStart(2, '0')}</span><small>{slideLabels[slide]}</small></div>
        <button onClick={() => go(slide + 1)} disabled={slide === slideLabels.length - 1} aria-label="Diapositiva siguiente"><ArrowRight /></button>
        <button className="restart" onClick={() => { go(0); setElapsed(0); }} title="Reiniciar"><RotateCcw size={17} /></button>
      </footer>

      {project && (
        <dialog open className="modal-backdrop" onCancel={() => setProject(null)}>
          <article className="project-modal" style={{ '--line-color': lines[project.line].color } as React.CSSProperties}>
            <button className="modal-close" aria-label="Cerrar" onClick={() => setProject(null)}><X /></button>
            <span className="modal-line">{lines[project.line].label}</span>
            {project.portrait && <Image className="director-portrait" src={project.portrait} alt={`Retrato de ${project.director}`} width={120} height={150} unoptimized />}
            <span className="modal-code">{project.id}</span>
            <h3>{project.title}</h3>
            <div className="modal-person"><span>Dirección</span><strong>{project.director}</strong></div>
            <div className="modal-person"><span>Equipo de investigación</span><p>{project.researchers}</p></div>
            <div className="team-portraits">
              {peoplePortraits.filter((person) => project.researchers.includes(person.name)).map((person) => (
                <div key={person.name}>
                  <Image src={person.src} alt={`Retrato de ${person.name}`} width={68} height={82} unoptimized />
                  <span>{person.name}</span>
                </div>
              ))}
            </div>
          </article>
        </dialog>
      )}
    </main>
  );
}
