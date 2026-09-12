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
  objective: string;
  publications: string[];
};

type LineKey = 'robotica' | 'software' | 'educacion';

const lines: Record<LineKey, { label: string; short: string; color: string }> = {
  robotica: {
    label: 'Automatización y Robótica',
    short: 'Robótica',
    color: '#d50851',
  },
  software: {
    label: 'Ingeniería de Software',
    short: 'Software',
    color: '#7d1535',
  },
  educacion: {
    label: 'Sociedad del Conocimiento y Tecnologías aplicadas a la Educación',
    short: 'Educación',
    color: '#0d1640',
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
    objective: 'Definir y validar un método sistemático, incremental y reproducible para transformar propiedades y capacidades en sistemas de gestión empresarial consolidados.',
    publications: [
      'Sartorio, A., Ayala, S., & Hernández, A. (2025). Diseño de aplicaciones e-learning adaptativas: superando limitaciones mediante arquitecturas modulares y escalables. JAIIO 2025.',
      'Sartorio, A., & Rossi, G. (2026). Transformación de LMS a ALS utilizando una arquitectura de referencia. WICC 2026.',
      'Sánchez, A., Luccini, E., Alderete, A., Musilli, S., & Sartorio, A. (2026). Odo-park: automatización de la gestión de estacionamientos por medio de computer vision y Odoo. WICC 2026.',
      'Sartorio, A., & Rossi, G. (2026). From Learning Management Systems to Adaptive Learning. WICC 2026.',
    ],
  },
  {
    id: 'TI/22/116',
    title: 'Tecnología Arduino aplicada a requerimientos sociales',
    director: 'Pedro López',
    researchers: 'Carlos Niell, Fernando Armas',
    line: 'robotica',
    portrait: '/assets/pedro-lopez.png',
    objective: 'Desarrollar robots que respondan a necesidades de personas con discapacidad.',
    publications: ['Passerini, S., Tabelione, F., & López, P. (2026). Desarrollo de un sistema cibernético de asistencia: prótesis robótica basada en visión computacional y arquitectura distribuida. WICC 2026.'],
  },
  {
    id: 'TI/22/113',
    title: 'La tecnología blockchain como impulso para la transformación digital de las organizaciones',
    director: 'Alejandro Hernández',
    researchers: 'Pablo Audoglio, Leonardo Prósperi, Claudia Pons, Jorge Kamlofsky',
    line: 'software',
    portrait: '/assets/alejandro-hernandez.png',
    objective: 'Estudiar casos de uso de blockchain que impulsen la transformación digital de las organizaciones.',
    publications: [
      'Dángelo, V., López, P., & Hernández, A. (2025). Transferencias de conceptos básicos de programación de la escuela media a la universidad. Revista de Educación en Ingeniería.',
      'Jaime, F., Estelles, J. P., Lodato, M., Torassa Colombero, V., & Hernández, A. (2025). Modelos de micropagos descentralizados: una propuesta basada en blockchain para servicios digitales. CONAIISI 2025.',
      'Ayala, S., Sartorio, A., Hernández, A., Gaseli, J., Dip, M., & Durán, M. (2026). Inteligencia artificial generativa: relevamiento sobre transformaciones pedagógicas y plataformas educativas. WICC 2026.',
    ],
  },
  {
    id: 'TI/22/117',
    title: 'Hojas de rutas de aprendizaje aplicadas al desarrollo de software',
    director: 'Alejandro Sartorio',
    researchers: 'Matías Banega, Sebastián Velázquez, Carlos Neil, Marcelo De Vincenzi Zemborain',
    line: 'software',
    portrait: '/assets/alejandro-sartorio.png',
    objective: 'Crear un módulo tecnológico y metodológico para construir y utilizar hojas de ruta de actividades educativas aplicadas al desarrollo de software.',
    publications: ['Castellini, G., Avella, L., Villa, L., & Sartorio, A. (en prensa). Hojas de rutas de aprendizajes basadas en metodología ágil. Actas CONAIISI.'],
  },
  {
    id: 'TI/20/114',
    title: 'Ciberseguridad, conceptos y aplicaciones',
    director: 'Santiago Roatta',
    researchers: 'Pedro López, María Eugenia Casco',
    line: 'software',
    portrait: '/assets/santiago-roatta.png',
    objective: 'Proteger la infraestructura de redes informáticas y sus componentes mediante investigación, desarrollo y enseñanza en ciberseguridad.',
    publications: [
      'Roatta, S., Casco, M. E., & Torassa, V. (2025). Dockerización de servidores SCADA: ciberseguridad industrial. WICC.',
      'Torassa, A., Roatta, S., & Casco, M. E. (2025). Uso ético de los agentes de inteligencia artificial en la investigación académica. CACIC.',
      'Estelles, J., Roatta, S., & Casco, M. E. (2025). Seguridad en APIs: identificación y mitigación de vulnerabilidades críticas. CONAIISI.',
      'Casco, M. E., & Roatta, S. E. (2025). Management of non-custodian digital evidence: an ISO/IEC 27050 standards-based approach. Springer.',
      'Torassa, V., Casco, M. E., & Roatta, S. (2026). Go como lenguaje de diseño: reducción de complejidad accidental en sistemas concurrentes. WICC 2026.',
      'Casco, M. E., & Roatta, S. (2026). Programa de investigación, desarrollo y enseñanza de ciberseguridad en la UAI. WICC 2026.',
    ],
  },
  {
    id: 'TI/26/139',
    title: 'Datawarehouse e IA para indicadores de soft skills',
    director: 'Silvia Poncio',
    researchers: 'Cintia Cuña, Alejandro Sartorio',
    line: 'educacion',
    portrait: '/assets/silvia-poncio.png',
    objective: 'Diseñar, implementar y validar un datawarehouse con IA para diagnosticar y visualizar soft skills mediante indicadores útiles para formación y talento humano.',
    publications: [
      'Poncio, S., Cuña, C., Cardú, N., & Ruiz, G. (2025). Data Warehouse Soft Skills: modelo diagnóstico para la observación de la actitud empática. TEYET.',
      'Poncio, S., Cuña, C., Cardú, N., Ruiz, G., & Bressan, A. (2025). Inteligencia artificial en el modelo de competencias emprendedoras. AFIDE, Roma.',
      'Poncio, S., Cuña, C., Bressan, A., Cardú, N., & Ruiz, G. (2025). Data Warehouse Soft Skills: diagnóstico de la capacidad de cooperar con otros. IPCTIIC.',
      'Bressan, A., Cardú, N., Ruiz, G., Poncio, S., & Cuña, C. (2026). Modelo diagnóstico integral de competencias mediante Business Intelligence e Inteligencia Artificial. WICC 2026.',
    ],
  },
  {
    id: 'TI/25/128',
    title: 'Taxonomía de prompting para optimizar la accesibilidad en sistemas de IA conversacional',
    director: 'María Andrea Guisen',
    researchers: 'Claudia Pons, Christian Parkinson, Alejandro Sartorio',
    line: 'educacion',
    portrait: '/assets/maria-andrea-guisen.png',
    objective: 'Desarrollar una taxonomía de prompts que integre dimensiones estructurales, funcionales, contextuales y expresivas para optimizar la accesibilidad académica.',
    publications: [
      'Giorgi, L., Acosta, P., López Serra, L., & Guisen, M. A. (2025). Taxonomía de prompting para la optimización de la accesibilidad en sistemas de IA conversacional. CIITI TE.',
      'Giorgi, L., Acosta, P., López Serra, L., & Guisen, M. A. (2025). Hacia una taxonomía de prompting accesible en la educación superior. CIIAE.',
      'Acosta, P., López Serra, L., Giorgi, L., & Guisen, M. A. (2025). Taxonomía de prompts para optimizar la accesibilidad académica. Revista RAIA.',
      'Guisen, M. A., Giorgi, L. N., Acosta, P. E., López Serra, L., Sartorio, A., & Pons, C. (2026). El prompt como unidad crítica de accesibilidad en educación superior. WICC 2026.',
    ],
  },
  {
    id: 'TI/25/129',
    title: 'Punto tecnológico para la accesibilidad de personas con síndrome de Rett',
    director: 'María Andrea Guisen',
    researchers: 'Claudia Pons, Christian Parkinson, Mauro Soto, Nadia Carolina Ksybala',
    line: 'educacion',
    portrait: '/assets/maria-andrea-guisen.png',
    objective: 'Identificar demandas emergentes de accesibilidad comunicacional y desarrollar soluciones informáticas de baja complejidad técnica y alto impacto social.',
    publications: [
      'Guisen, M. A., et al. (2025). Especialistas del CONICET lideran un proyecto para mejorar la accesibilidad comunicacional. VocAr.',
      'Garay Angulo, O., Guisen, M. A., & Gutiérrez Rodríguez, V. (2025). Elaboración de textos y edición de publicaciones digitales accesibles. CLACSO.',
      'Guisen, M. A. (2025). The EntteR Project: women-led innovation in assistive technologies. LAWCC, CLEI.',
      'Guisen, M. A., Safir Vasquez Yrigoin, A., Capomasi, I., Banducci, M., López, P., Soto, M. A., & Ksybala, N. C. (2026). Punto tecnológico para estrategias de accesibilidad comunicacional. WICC 2026.',
      'Guisen, M. A., & Lavayen, M. V. (2026). Accesibilidad comunicacional: entre la ciencia y la experiencia. Fonoaudiología Federal.',
    ],
  },
  {
    id: 'TI/22/111',
    title: 'Sitios web educativos e IA: análisis de estándares de usabilidad WCAG',
    director: 'Soledad Ayala',
    researchers: 'Alejandro Hernández, Juliana Carpinetti, Santiago Roatta',
    line: 'educacion',
    portrait: '/assets/soledad-ayala.png',
    objective: 'Analizar las condiciones de usabilidad de plataformas educativas e identificar cómo se aplican las Web Content Accessibility Guidelines.',
    publications: [
      'Ayala, S., Sartorio, A., Hernández, A., Gaseli, J., & Dip, M. (2025). Educación superior, plataformas e inteligencia artificial. 54 JAIIO. Premio al mejor trabajo del simposio.',
      'Ayala, S., & Betta, L. (2025). Criterios pedagógicos de materiales educativos digitales en el campus virtual UNRaf. Jornadas de Investigación en Educación.',
      'Ayala, S., Sartorio, A., Hernández, A., Gaseli, J., Dip, M., & Durán, M. (2026). Inteligencia artificial generativa y transformaciones pedagógicas actuales. WICC 2026.',
      'Betta, L., Ayala, S., & Perren, J. (2025). Los materiales educativos digitales en las aulas del campus virtual UNRaf. Seminario RUEDA.',
    ],
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

const hiperEvidence = [
  { src: '/assets/hiper-agentes.png', title: 'Agentes personales', text: 'Roles que acompañan y ejecutan trabajo cotidiano.' },
  { src: '/assets/hiper-configuracion.png', title: 'Configuración de agentes', text: 'Identidad, permisos, herramientas y contexto.' },
  { src: '/assets/hiper-swarms.png', title: 'Equipos de agentes', text: 'Especialidades que se coordinan sobre tareas reales.' },
  { src: '/assets/hiper-canales.jpg', title: 'Canales colaborativos', text: 'Humanos y agentes conversan, deciden y dejan evidencia.' },
  { src: '/assets/hiper-oficina.png', title: 'Oficina virtual', text: 'Áreas, vínculos y procesos representados visualmente.' },
  { src: '/assets/hiper-cerebro.png', title: 'Cerebro organizacional', text: 'Señales dispersas convertidas en contexto compartido.' },
  { src: '/assets/hiper-tablero.png', title: 'Tablero de productividad', text: 'Métricas y aprendizaje para medir cómo escala el sistema.' },
  { src: '/assets/hiper-terminal.png', title: 'Motores de agentes', text: 'Ambientes donde múltiples agentes trabajan en paralelo.' },
];

const slideLabels = [
  'Portada',
  'Misión y visión',
  'El desafío',
  'Proyecto troncal',
  'Método',
  'Colaboración',
  'Hiperproductividad en acción',
  'Capacidades',
  'Comunidad CAETI',
  'Líneas de investigación',
  'Mapa de proyectos',
  'Personas y agentes',
  'El aterrizaje de la Hiperⁿproductividad',
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
  const [evidenceIndex, setEvidenceIndex] = useState<number | null>(null);
  const [closingVision, setClosingVision] = useState<'fantasia' | 'presente' | 'posible'>('fantasia');

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
      if (event.key === 'Escape') { setProject(null); setEvidenceIndex(null); }
      if (project || evidenceIndex !== null) return;
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
  }, [project, evidenceIndex]);

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
          <Image className="uai-logo" src="/assets/uai-logo.png" alt="Universidad Abierta Interamericana" width={147} height={29} unoptimized />
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
            <div className="slide identity-slide">
              <Kicker>Centro de Altos Estudios en Tecnología Informática</Kicker>
              <SlideTitle>Investigación aplicada que conecta universidad, industria y sociedad</SlideTitle>
              <div className="identity-columns">
                <div><span>Misión</span><p>Contribuir al desarrollo de las tecnologías de la información y la comunicación mediante investigación básica y aplicada, formación de recursos humanos y transferencia de resultados.</p></div>
                <div><span>Visión</span><p>Abordar problemas relevantes y necesidades sociales mediante soluciones tecnológicas basadas en ciencia, técnica, pensamiento organizador e innovación.</p></div>
              </div>
            </div>
          )}

          {slide === 2 && (
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

          {slide === 3 && (
            <div className="slide trunk-slide">
              <Kicker>Proyecto troncal · TI/26/140</Kicker>
              <SlideTitle>Una arquitectura que conecta la investigación con la gestión real del Centro</SlideTitle>
              <div className="trunk-scene">
                <div className="trunk-layout">
                  <div className="trunk-core"><Network /><span>Arquitectura adaptativa</span><small>Método · capacidades · validación</small></div>
                  <div className="trunk-orbits">
                    <span><Bot /> Agentes</span><span><Users /> Personas</span><span><Workflow /> Procesos</span><span><Boxes /> Proyectos</span>
                  </div>
                </div>
                <div className="cycle-collage" aria-label="Ciclo visual de hiperproductividad">
                  <div className="cycle-heading"><Sparkles /><span>Productividad que escala<br />ciclo tras ciclo</span></div>
                  {[
                    ['/assets/hiper-agentes.png', '01 · Acción'],
                    ['/assets/hiper-canales.jpg', '02 · Amplificación'],
                    ['/assets/hiper-tablero.png', '03 · Recursión'],
                  ].map(([src, label], index) => (
                    <figure className={`cycle-shot cycle-shot-${index + 1}`} key={src}>
                      <Image src={src} alt={label} fill sizes="(max-width: 900px) 28vw, 15vw" />
                      <figcaption>{label}</figcaption>
                    </figure>
                  ))}
                  <div className="cycle-scale"><span>P¹</span><ChevronRight /><span>P²</span><ChevronRight /><span>P³</span><ChevronRight /><strong>Pⁿ</strong></div>
                </div>
              </div>
              <div className="director-strip"><span>Dirección</span><strong>Alejandro Sartorio</strong><span>Ingeniería de Software</span></div>
            </div>
          )}

          {slide === 4 && (
            <div className="slide method-slide">
              <Kicker>Método y plataforma experimental</Kicker>
              <SlideTitle>La arquitectura evoluciona mientras el Centro trabaja</SlideTitle>
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
              <div className="combined-platform-strip"><span><Bot /> Agentes</span><span><MessageSquareMore /> Colaboración</span><span><Database /> Gestión Odoo</span></div>
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
            <div className="slide evidence-slide">
              <div className="evidence-heading"><div><Kicker>Hiperproductividad en acción</Kicker><SlideTitle>Una arquitectura visible en entornos reales</SlideTitle></div><span>Seleccioná para ampliar</span></div>
              <div className="evidence-mosaic">
                {hiperEvidence.map((item, index) => (
                  <button key={item.src} onClick={() => setEvidenceIndex(index)} aria-label={`Ampliar ${item.title}`}>
                    <Image src={item.src} alt={item.title} fill sizes="(max-width: 900px) 45vw, 24vw" unoptimized />
                    <span>{item.title}</span>
                    <Maximize2 />
                  </button>
                ))}
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
            <div className="slide community-slide">
              <div className="community-copy">
                <Kicker>Comunidad CAETI Rosario</Kicker>
                <SlideTitle>Las personas que sostienen el ecosistema de investigación</SlideTitle>
                <p>Dirección, investigadores, docentes e invitados aportan experiencia diversa sobre una plataforma común.</p>
              </div>
              <figure><Image src="/assets/investigadores-caeti.png" alt="Investigadores del CAETI Rosario" width={930} height={911} unoptimized /></figure>
            </div>
          )}

          {slide === 9 && (
            <div className="slide lines-slide">
              <Kicker>CAETI 2026</Kicker>
              <SlideTitle>Tres líneas reúnen los proyectos del Centro</SlideTitle>
              <div className="research-lines">
                {(Object.keys(lines) as LineKey[]).map((key, index) => (
                  <button key={key} style={{ '--line-color': lines[key].color, animationDelay: `${index * 140}ms` } as React.CSSProperties} onClick={() => { setLineFilter(key); go(10); }}>
                    <span className="line-number">0{index + 1}</span>
                    <strong>{lines[key].label}</strong>
                    <span>{projects.filter((p) => p.line === key).length} proyectos</span>
                    <ChevronRight />
                  </button>
                ))}
              </div>
            </div>
          )}

          {slide === 10 && (
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
              <p className="interaction-hint"><Search size={15} /> Seleccioná un proyecto para ver equipo, objetivo y publicaciones</p>
            </div>
          )}

          {slide === 11 && (
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

          {slide === 12 && (
            <div className="slide landing-slide">
              <Kicker>IA y transformación organizacional</Kicker>
              <h2 className="landing-title"><span>EL ATERRIZAJE DE LA</span><strong>HIPER<sup>N</sup>PRODUCTIVIDAD</strong></h2>
              <p className="landing-lead">De la capacidad de la IA a su adopción efectiva en la última milla organizacional.</p>
              <div className="landing-stage">
                <div className="landing-tabs">
                  <button className={closingVision === 'fantasia' ? 'active' : ''} onClick={() => setClosingVision('fantasia')}><b>01</b><span>La fantasía profesional</span><small>Humanos + robots en la oficina consolidada</small></button>
                  <button className={closingVision === 'presente' ? 'active' : ''} onClick={() => setClosingVision('presente')}><b>02</b><span>Lo que ya hacemos</span><small>El ecosistema experimental del CAETI</small></button>
                  <button className={closingVision === 'posible' ? 'active' : ''} onClick={() => setClosingVision('posible')}><b>03</b><span>La organización posible</span><small>Un profesional ↔ un agente gemelo</small></button>
                </div>
                <div className="landing-display">
                  {closingVision === 'fantasia' && <figure className="landing-photo"><Image src="/assets/colaboracion-humanos-robots.jpg" alt="Profesionales y robots colaborando en una oficina" fill sizes="55vw" unoptimized /><figcaption><b>IMAGINARIO COLECTIVO</b><strong>La oficina conocida incorpora nuevos compañeros digitales</strong><span>Procesos estandarizados · roles reconocibles · convivencia humano–robot</span></figcaption></figure>}
                  {closingVision === 'presente' && <div className="landing-present"><div className="landing-tech-grid"><figure><Image src="/assets/hiper-cerebro.png" alt="Cerebro organizacional" fill sizes="18vw" unoptimized /><figcaption>Datos</figcaption></figure><figure><Image src="/assets/hiper-terminal.png" alt="Agentes trabajando en paralelo" fill sizes="18vw" unoptimized /><figcaption>Agentes</figcaption></figure><figure><Image src="/assets/hiper-canales.jpg" alt="Canales colaborativos" fill sizes="18vw" unoptimized /><figcaption>Procesos</figcaption></figure></div><div className="landing-core"><Network /><b>CAETI</b><small>canales · modelos · herramientas · integraciones · memoria</small></div></div>}
                  {closingVision === 'posible' && <div className="landing-twins"><div className="twin-node"><Users /><b>Profesional</b><small>Objetivos · criterio · autoridad</small></div><ChevronRight /><div className="twin-node twin-agent"><Bot /><b>Agente gemelo</b><small>Interfaz única y contexto personal</small></div><ChevronRight /><div className="twin-partners"><span>Personas</span><span>Agentes</span><span>Robots</span><span>Sistemas</span></div><p>La complejidad queda detrás del agente: el profesional mantiene el control y delega la coordinación.</p></div>}
                </div>
              </div>
              <p className="landing-feedback">{closingVision === 'fantasia' ? 'La imagen compartida: humanos y robots conviven dentro de una oficina y ejecutan procesos conocidos.' : closingVision === 'presente' ? 'La práctica presente: agentes, canales, datos e integraciones ya sostienen trabajo real de investigación y gestión.' : 'La propuesta organizacional: cada profesional puede concentrar su relación con personas, agentes, robots y sistemas en una interfaz inteligente.'}</p>
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
            <div className="modal-person objective-row"><span>Objetivo</span><p>{project.objective}</p></div>
            <div className="modal-publications">
              <span>Publicaciones · referencias APA</span>
              <ol>{project.publications.map((publication) => <li key={publication}>{publication}</li>)}</ol>
            </div>
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

      {evidenceIndex !== null && (
        <dialog open className="image-lightbox" onCancel={() => setEvidenceIndex(null)}>
          <button className="lightbox-close" aria-label="Cerrar imagen" onClick={() => setEvidenceIndex(null)}><X /></button>
          <button className="lightbox-nav lightbox-prev" aria-label="Imagen anterior" onClick={() => setEvidenceIndex((evidenceIndex - 1 + hiperEvidence.length) % hiperEvidence.length)}><ArrowLeft /></button>
          <figure>
            <Image src={hiperEvidence[evidenceIndex].src} alt={hiperEvidence[evidenceIndex].title} width={1800} height={1100} unoptimized />
            <figcaption><strong>{hiperEvidence[evidenceIndex].title}</strong><span>{hiperEvidence[evidenceIndex].text}</span></figcaption>
          </figure>
          <button className="lightbox-nav lightbox-next" aria-label="Imagen siguiente" onClick={() => setEvidenceIndex((evidenceIndex + 1) % hiperEvidence.length)}><ArrowRight /></button>
        </dialog>
      )}
    </main>
  );
}
