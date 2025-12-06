import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { scrollToId } from '../../utils/dom';

const Navbar = ({ user, onLogout }) => {
  const items = [
    { label: 'Destacados', command: () => scrollToId('showcase') },
    { label: 'Métricas', command: () => scrollToId('metrics') },
    { label: 'Proyectos', command: () => scrollToId('projects') },
    { label: 'Repositorios', command: () => scrollToId('repos') }
  ];

  const start = (
    <div className="brand">
      <span>Portfolio Studio</span>
      <Badge value="PrimeReact" severity="info" />
    </div>
  );

  const end = user ? (
    <div className="navbar-user">
      <Avatar label={user.name?.[0] ?? 'P'} shape="circle" className="mr-2" />
      <Button label="Cerrar sesión" icon="pi pi-sign-out" onClick={onLogout} text severity="secondary" />
    </div>
  ) : (
    <Button label="Acceder" icon="pi pi-user" text severity="secondary" onClick={() => scrollToId('auth')} />
  );

  return <Menubar model={items} start={start} end={end} className="portfolio-menubar" />;
};

export default Navbar;
