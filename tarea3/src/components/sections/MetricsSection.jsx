import { useMemo } from 'react';
import { Chart } from 'primereact/chart';
import 'chart.js/auto';
import { SKILL_DATA } from '../../data/content';
import useReveal from '../../hooks/useReveal';

const palette = ['#a855f7', '#7c3aed', '#6366f1', '#22d3ee', '#0ea5e9', '#06b6d4', '#f472b6'];

const MetricsSection = ({ repos = [], status }) => {
  const sectionRef = useReveal();

  const distribution = useMemo(() => {
    if (status === 'ready' && repos.length > 0) {
      const counts = repos.reduce((acc, repo) => {
        const key = repo.language || 'Full stack';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
      const labels = Object.keys(counts);
      const values = labels.map((label) => counts[label]);
      return { labels, values, source: 'github' };
    }
    return {
      labels: SKILL_DATA.map((item) => item.label),
      values: SKILL_DATA.map((item) => item.value),
      source: 'fallback'
    };
  }, [repos, status]);

  const chartData = useMemo(
    () => ({
      labels: distribution.labels,
      datasets: [
        {
          label: distribution.source === 'github' ? 'Repos por lenguaje' : 'Referencias del portafolio',
          backgroundColor: distribution.labels.map((_, index) => palette[index % palette.length]),
          borderRadius: 12,
          data: distribution.values
        }
      ]
    }),
    [distribution]
  );

  const chartOptions = useMemo(
    () => ({
      plugins: {
        legend: {
          labels: {
            color: '#d5d8ff'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#c7ccf5' },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(148, 163, 184, 0.2)' }
        }
      }
    }),
    []
  );

  return (
    <section ref={sectionRef} className="panel reveal scroll-scene scroll-mid" id="metrics">
      <div className="panel-header">
        <p className="eyebrow">Gráficas</p>
        <h2>Impacto técnico por práctica</h2>
      </div>
      <Chart type="bar" data={chartData} options={chartOptions} className="chart" />
      {distribution.source === 'github' ? (
        <p className="metrics-note">
          Datos en vivo: {repos.length} repos inspeccionados · {distribution.labels.length} stacks detectados desde GitHub.
        </p>
      ) : (
        <p className="metrics-note">Aún sin sincronizar GitHub. Mostrando distribución de referencia del portafolio.</p>
      )}
    </section>
  );
};

export default MetricsSection;
