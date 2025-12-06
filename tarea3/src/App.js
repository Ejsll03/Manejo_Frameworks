import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import SpotlightCarousel from './components/sections/SpotlightCarousel';
import MetricsSection from './components/sections/MetricsSection';
import ProcessTabs from './components/sections/ProcessTabs';
import ProjectsSection from './components/sections/ProjectsSection';
import RepoTimeline from './components/sections/RepoTimeline';
import AuthLanding from './components/auth/AuthLanding';
import { GITHUB_USER } from './data/content';
import useScrollProgress from './hooks/useScrollProgress';

function App() {
	useScrollProgress();
	const [authMode, setAuthMode] = useState('login');
	const [formData, setFormData] = useState({ name: '', email: '', password: '' });
	const [message, setMessage] = useState('');
	const [user, setUser] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem('portfolioSessionPrime')) || null;
		} catch (error) {
			return null;
		}
	});
	const [repos, setRepos] = useState([]);
	const [repoStatus, setRepoStatus] = useState('idle');

	const AUTH_FIELD_LIMIT = 25;

	useEffect(() => {
		if (user) {
			localStorage.setItem('portfolioSessionPrime', JSON.stringify(user));
		} else {
			localStorage.removeItem('portfolioSessionPrime');
		}
	}, [user]);

	useEffect(() => {
		if (!user) {
			return;
		}

		const fetchRepos = async () => {
			setRepoStatus('loading');
			try {
				const response = await fetch(
					`https://api.github.com/users/${GITHUB_USER}/repos?per_page=6&sort=updated`,
					{
						headers: {
							Accept: 'application/vnd.github+json'
						}
					}
				);
				if (!response.ok) {
					throw new Error('GitHub error');
				}
				const data = await response.json();
				setRepos(data);
				setRepoStatus('ready');
			} catch (error) {
				setRepoStatus('error');
			}
		};

		fetchRepos();
	}, [user]);

	const handleInput = (event) => {
		const { name, value } = event.target;
		const constrainedValue = name === 'name' || name === 'password' ? value.slice(0, AUTH_FIELD_LIMIT) : value;
		setFormData((prev) => ({ ...prev, [name]: constrainedValue }));
	};

	const handleAuth = (event) => {
		event.preventDefault();
		setMessage('');
		const email = formData.email.trim().toLowerCase();
		const password = formData.password.trim();
		const stored = localStorage.getItem('portfolioCredentialsPrime');

		if (authMode === 'register') {
			if (!formData.name.trim() || !email || password.length < 4) {
				setMessage('Completa todos los campos y usa al menos 4 caracteres en la contraseña.');
				return;
			}

			const newUser = { name: formData.name.trim(), email, password };
			localStorage.setItem('portfolioCredentialsPrime', JSON.stringify(newUser));
			setFormData({ name: '', email: '', password: '' });
			setAuthMode('login');
			setMessage('Registro completado. Usa tus credenciales para ingresar.');
			return;
		}

		if (!stored) {
			setMessage('No encontramos una cuenta. Regístrate primero.');
			return;
		}

		const saved = JSON.parse(stored);
		if (saved.email === email && saved.password === password) {
			setUser({ name: saved.name, email: saved.email });
			setFormData({ name: '', email: '', password: '' });
			return;
		}

		setMessage('Las credenciales no coinciden.');
	};

	const handleLogout = () => {
		setUser(null);
		setRepos([]);
		setRepoStatus('idle');
	};

	const toggleAuthMode = () => setAuthMode((prev) => (prev === 'login' ? 'register' : 'login'));

	return (
		<div className="app-shell">
			<Navbar user={user} onLogout={handleLogout} />
			<main className="main-grid">
				{!user ? (
					<AuthLanding
						authMode={authMode}
						formData={formData}
						message={message}
						onInput={handleInput}
						onSubmit={handleAuth}
						onSwitch={toggleAuthMode}
					/>
				) : (
					<>
						<HeroSection user={user} />
						<SpotlightCarousel repos={repos} status={repoStatus} />
						<MetricsSection repos={repos} status={repoStatus} />
						<ProcessTabs />
						<ProjectsSection repos={repos} status={repoStatus} />
						<RepoTimeline repos={repos} status={repoStatus} />
					</>
				)}
			</main>
			<Footer />
		</div>
	);
}

export default App;

