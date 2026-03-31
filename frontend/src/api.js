const BASE = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('iss_token');
}

export async function register(data) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function logSimulation(selectedRoles, selectedTasks) {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${BASE}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ selectedRoles, selectedTasks }),
  });
  return res.json();
}

export async function getMe() {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${BASE}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
