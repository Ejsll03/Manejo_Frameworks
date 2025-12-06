import { Card } from 'primereact/card';
import AuthCard from './AuthCard';
import { ACCESS_FEATURES } from '../../data/content';
import useReveal from '../../hooks/useReveal';

const AuthLanding = ({ authMode, formData, message, onInput, onSubmit, onSwitch }) => {
  const sectionRef = useReveal({ rootMargin: '-10% 0px', threshold: 0.2 });

  return (
    <section ref={sectionRef} className="auth-landing reveal scroll-scene scroll-slow" id="auth">
      <div className="auth-narrative">
        <p className="eyebrow">Laboratorio para ingeniería</p>
        <h1>Explora casos reales con decisiones técnicas explicadas en lenguaje de ingeniería.</h1>
        <p>Blueprints de arquitectura, métricas de observabilidad y experimentos con IA pegados a tus repositorios para que tomes decisiones informadas.</p>
        <div className="auth-feature-grid">
          {ACCESS_FEATURES.map((feature) => (
            <Card key={feature.title} className="auth-feature-card">
              <strong>{feature.title}</strong>
              <span>{feature.detail}</span>
            </Card>
          ))}
        </div>
        <div className="auth-glow" aria-hidden="true" />
      </div>
      <div className="auth-panel" aria-label="Formulario de acceso">
        <div className="panel-header">
          <p className="eyebrow">Ingreso / Registro</p>
          <h2>Accede a tu laboratorio privado</h2>
        </div>
        <AuthCard
          mode={authMode}
          formData={formData}
          message={message}
          onChange={onInput}
          onSubmit={onSubmit}
          onSwitch={onSwitch}
        />
      </div>
    </section>
  );
};

export default AuthLanding;
