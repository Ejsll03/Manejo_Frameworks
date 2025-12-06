import { TabView, TabPanel } from 'primereact/tabview';
import { TAB_SECTIONS } from '../../data/content';
import useReveal from '../../hooks/useReveal';

const ProcessTabs = () => {
  const sectionRef = useReveal();
  const tabs = Array.isArray(TAB_SECTIONS) ? TAB_SECTIONS : [];

  return (
    <section ref={sectionRef} className="panel reveal scroll-scene scroll-mid" id="process">
      <div className="panel-header">
        <p className="eyebrow">Pestañas</p>
        <h2>Así opero proyectos de ingeniería</h2>
      </div>
      {tabs.length === 0 ? (
        <p className="panel-empty">Sin procesos disponibles por ahora.</p>
      ) : (
        <TabView>
          {tabs.map((tab) => {
            const paragraphs = Array.isArray(tab.paragraphs) ? tab.paragraphs : [];
            return (
              <TabPanel header={tab.label} key={tab.id} leftIcon="pi pi-bolt mr-2">
                <h3>{tab.title}</h3>
                <ul>
                  {paragraphs.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              </TabPanel>
            );
          })}
        </TabView>
      )}
    </section>
  );
};

export default ProcessTabs;
