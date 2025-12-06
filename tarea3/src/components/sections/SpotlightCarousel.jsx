import { useMemo } from 'react';
import { Carousel } from 'primereact/carousel';
import { SPOTLIGHT, SPOTLIGHT_RESPONSIVE } from '../../data/content';
import useReveal from '../../hooks/useReveal';

const GRADIENTS = [
  'linear-gradient(135deg, #a855f7, #7c3aed)',
  'linear-gradient(135deg, #22d3ee, #0ea5e9)',
  'linear-gradient(135deg, #f97316, #ea580c)',
  'linear-gradient(135deg, #ef4444, #f59e0b)'
];

const SpotlightCarousel = ({ repos = [], status }) => {
  const sectionRef = useReveal();

  const spotlightItems = useMemo(() => {
    if (status === 'ready' && repos.length > 0) {
      return repos
        .filter((repo) => !repo.fork)
        .slice(0, 4)
        .map((repo, index) => ({
          id: repo.id,
          title: repo.name,
          context: repo.language || 'Stack híbrido',
          highlight: repo.description || `Último push ${new Date(repo.pushed_at).toLocaleDateString()}`,
          color: GRADIENTS[index % GRADIENTS.length]
        }));
    }
    return SPOTLIGHT;
  }, [repos, status]);

  const itemTemplate = (item) => (
    <article className="spotlight-card" style={{ backgroundImage: item.color }}>
      <p>{item.context}</p>
      <h3>{item.title}</h3>
      <span>{item.highlight}</span>
    </article>
  );

  return (
    <section ref={sectionRef} className="panel reveal scroll-scene scroll-mid" id="showcase">
      <div className="panel-header">
        <p className="eyebrow">Carrusel</p>
        <h2>Destacados de la semana</h2>
      </div>
      <Carousel
        value={spotlightItems}
        numVisible={2}
        numScroll={1}
        circular
        autoplayInterval={4500}
        responsiveOptions={SPOTLIGHT_RESPONSIVE}
        itemTemplate={itemTemplate}
      />
    </section>
  );
};

export default SpotlightCarousel;
