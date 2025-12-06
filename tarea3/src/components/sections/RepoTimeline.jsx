import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Timeline } from 'primereact/timeline';
import useReveal from '../../hooks/useReveal';

const RepoTimeline = ({ repos, status }) => {
  const sectionRef = useReveal();
  const marker = () => <span className="repo-marker pi pi-circle-on" />;

  const content = (item) => (
    <Card title={item.name} subTitle={item.language || 'Stack completo'} className="repo-card">
      <p>{item.description || 'Aún no hay descripción disponible.'}</p>
      <div className="repo-meta">
        <Tag value={item.language || 'Mixto'} severity="success" />
        <small>Actualizado {new Date(item.updated_at).toLocaleDateString()}</small>
      </div>
      <Button type="button" icon="pi pi-github" label="Abrir repo" text onClick={() => window.open(item.html_url, '_blank', 'noreferrer')} />
    </Card>
  );

  return (
    <section ref={sectionRef} className="panel reveal scroll-scene scroll-deep" id="repos">
      <div className="panel-header">
        <p className="eyebrow">Integración GitHub</p>
        <h2>Repositorios activos para ingeniería</h2>
      </div>
      {status === 'loading' && <p>Consultando repositorios...</p>}
      {status === 'error' && <p className="error">No pudimos cargar los repositorios.</p>}
      {status === 'ready' && repos.length === 0 && <p>No se encontraron repositorios.</p>}
      {repos.length > 0 && status === 'ready' && (
        <Timeline value={repos} opposite={(item) => item.owner?.login} marker={marker} content={content} />
      )}
    </section>
  );
};

export default RepoTimeline;
