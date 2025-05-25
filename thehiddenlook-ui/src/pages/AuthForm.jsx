// AuthForm.jsx — utilisé pour Login et Register
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/api/login' : '/api/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erreur');

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>{isLogin ? 'Connexion' : 'Inscription'}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            {isLogin ? 'Se connecter' : 'Créer un compte'}
          </button>
        </form>
        <p style={styles.switchLink}>
          {isLogin ? (
            <>Pas encore de compte ? <span onClick={() => navigate('/register')} style={styles.link}>Créer un compte</span></>
          ) : (
            <>Déjà inscrit ? <span onClick={() => navigate('/login')} style={styles.link}>Se connecter</span></>
          )}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formCard: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#2d3748'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer'
  },
  error: {
    color: '#e53e3e',
    marginBottom: '10px'
  },
  switchLink: {
    marginTop: '1rem',
    fontSize: '0.95rem'
  },
  link: {
    color: '#4f46e5',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default AuthForm;
