import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { SKILL_DATA } from '../../data/content';
import { scrollToId } from '../../utils/dom';
import useReveal from '../../hooks/useReveal';

const HeroSection = ({ user }) => {
  const heroRef = useReveal({ threshold: 0.35 });

  return (
    <section ref={heroRef} className="hero reveal scroll-scene scroll-fast" id="hero">
      <div>
        <p className="eyebrow">Hola {user.name}</p>
        <h1>Ingeniero(a) en computación que mezcla arquitectura de software con narrativas claras y copilotos de IA.</h1>
        <p>8+ años desplegando servicios para SaaS y fintech, traduciendo decisiones de infraestructura en experiencias tangibles para equipos de producto y operaciones.</p>
        <div className="hero-actions">
          <Button label="Ver métricas" icon="pi pi-chart-bar" rounded onClick={() => scrollToId('metrics')} />
          <Button label="Repos recientes" icon="pi pi-github" severity="secondary" rounded onClick={() => scrollToId('repos')} />
        </div>
      </div>
      <Card className="hero-card" title="Panel de señales">
        <div className="hero-card-grid">
          {SKILL_DATA.slice(0, 3).map((skill) => (
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
