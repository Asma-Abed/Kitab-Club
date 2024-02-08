import { login, logout } from './login';
import { updateProfile } from './updateProfile';

const loginForm = document.getElementById('form');
const logoutButton = document.getElementById('logout');
const updateForm = document.getElementById('update');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const jobEl = document.getElementById('job');
const bioEl = document.getElementById('bio');
const fbEl = document.getElementById('urlfb');
const insEl = document.getElementById('urlin');
const twEl = document.getElementById('urltw');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutButton) logoutButton.addEventListener('click', logout);

if (updateForm)
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameEl.value ? nameEl.value : nameEl.placeholder;
    const email = emailEl.value ? emailEl.value : emailEl.placeholder;
    const job = jobEl.value ? jobEl.value : jobEl.placeholder;
    const bio = bioEl.value ? bioEl.value : bioEl.placeholder;
    const fb = fbEl.value ? fbEl.value : fbEl.placeholder;
    const ins = insEl.value ? insEl.value : insEl.placeholder;
    const tw = twEl.value ? twEl.value : twEl.placeholder;
    const social = [fb, ins, tw];

    updateProfile(name, email, job, bio, social);
  });
