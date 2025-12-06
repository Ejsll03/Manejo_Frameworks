import { Accordion, AccordionTab } from 'primereact/accordion';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import useReveal from '../../hooks/useReveal';

const getPreviewImage = (repo) =>
  `https://opengraph.githubassets.com/1/${repo.owner?.login ?? 'github'}/${repo.name}`;

const buildMetrics = (repo) => [
  { label: 'Estrellas', value: repo.stargazers_count },
  { label: 'Forks', value: repo.forks_count },
  { label: 'Incidencias', value: repo.open_issues_count },
  { label: 'Seguidores', value: repo.watchers_count }
];

const ProjectsSection = ({ repos, status }) => {
  const sectionRef = useReveal({ threshold: 0.2 });
  const curatedRepos = repos.filter((repo) => !repo.fork).slice(0, 4);

  return (
    <section ref={sectionRef} className="panel reveal scroll-scene scroll-deep" id="projects">
      <div className="panel-header">
        <p className="eyebrow">Casos técnicos</p>
        <h2>Proyectos con evidencia para ingeniería</h2>
      </div>

      {status === 'loading' && <p>Consultando tus repositorios...</p>}
      {status === 'error' && <p className="error">No pudimos leer GitHub justo ahora.</p>}
      {status === 'ready' && curatedRepos.length === 0 && <p>No hay repositorios disponibles.</p>}

      {status === 'ready' && curatedRepos.length > 0 && (
        <Accordion multiple>
          {curatedRepos.map((repo) => (
            <AccordionTab key={repo.id} header={repo.name} contentClassName="project-content">
              <div className="project-grid">
                <div className="project-media">
                  <img src={getPreviewImage(repo)} alt={`${repo.name} preview`} />
                  <div className="project-meta">
                    <small>Último push: {new Date(repo.pushed_at).toLocaleDateString()}</small>
                  </div>
                </div>
                <div className="project-copy">
                  <p>{repo.description || 'Este repositorio aún no tiene descripción.'}</p>
                  <div className="project-tags">
                    {repo.language && <Tag value={repo.language} severity="info" />}
                    <Tag value={repo.visibility === 'public' ? 'Público' : 'Privado'} severity="secondary" />
                    <Tag value={`Rama ${repo.default_branch}`} severity="contrast" />
                  </div>
                  <div className="project-metrics">
                    {buildMetrics(repo).map((metric) => (
                      <Card key={metric.label} className="metric-card">
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                      </Card>
                    ))}
                  </div>
                  {repo.topics && repo.topics.length > 0 && (
                    <ul className="project-topics">
                      {repo.topics.map((topic) => (
                        <li key={topic}>#{topic}</li>
                      ))}
                    </ul>
                  )}
                  <pre>{`git clone ${repo.clone_url}`}</pre>
                  <div className="project-actions">
                    <Button
                      type="button"
                      label="Ver código"
                      icon="pi pi-external-link"
                      onClick={() => window.open(repo.html_url, '_blank', 'noreferrer')}
                    />
                    <Button
                      type="button"
                      label="Ver commits"
                      icon="pi pi-history"
                      severity="secondary"
                      text
                      onClick={() => window.open(`${repo.html_url}/commits`, '_blank', 'noreferrer')}
                    />
                  </div>
                </div>
              </div>
            </AccordionTab>
          ))}
        </Accordion>
      )}
    </section>
  );
};

export default ProjectsSection;
