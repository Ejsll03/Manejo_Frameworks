import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { SKILL_DATA } from '../../data/content';
import { scrollToId } from '../../utils/dom';
import useReveal from '../../hooks/useReveal';

const HeroSection = ({ user }) => {
  const heroRef = useReveal({ threshold: 0.35 });
  const heroSkills = Array.isArray(SKILL_DATA) ? SKILL_DATA.slice(0, 3) : [];
  const displayName = user?.name ?? 'visitante';

  return (
    <section ref={heroRef} className="hero reveal scroll-scene scroll-fast" id="hero">
      <div>
        <p className="eyebrow">Hola {displayName}</p>
        <h1>Proyecto Tarea 3 – Manejo de Frameworks</h1>
        <p>Este proyecto forma parte de mis actividades académicas y demuestra el uso de conceptos fundamentales de desarrollo web, organización de código y manejo de frameworks o herramientas modernas.</p>
        <div className="hero-actions">
          <Button label="Ver métricas" icon="pi pi-chart-bar" rounded onClick={() => scrollToId('metrics')} />
          <Button label="Repos recientes" icon="pi pi-github" severity="secondary" rounded onClick={() => scrollToId('repos')} />
        </div>
      </div>
      <Card className="hero-card" title="Panel de señales">
        <div className="hero-card-grid">
          {heroSkills.length === 0 && <p className="hero-card-empty">Sin métricas cargadas.</p>}
          {heroSkills.map((skill) => (
            <div key={skill.label} className="hero-card-item">
              <span>{skill.label}</span>
              <strong>{skill.value}%</strong>
            </div>
          ))}
        </div>
        <Divider />
        <p>Seguimiento mensual de OKRs con notas cualitativas registradas en Linear.</p>
      </Card>
    </section>
  );
};

export default HeroSection;
