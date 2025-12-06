import { TabView, TabPanel } from 'primereact/tabview';
import { TAB_SECTIONS } from '../../data/content';
import useReveal from '../../hooks/useReveal';

const ProcessTabs = () => {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="panel reveal scroll-scene scroll-mid" id="process">
      <div className="panel-header">
        <p className="eyebrow">Pestañas</p>
        <h2>Así opero proyectos de ingeniería</h2>
      </div>
      <TabView>
        {TAB_SECTIONS.map((tab) => (
          <TabPanel header={tab.label} key={tab.id} leftIcon="pi pi-bolt mr-2">
            <h3>{tab.title}</h3>
            <ul>
              {tab.paragraphs.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </TabPanel>
        ))}
      </TabView>
    </section>
  );
};

export default ProcessTabs;
