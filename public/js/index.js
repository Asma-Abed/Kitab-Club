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

const passwordForm = document.getElementById('password-update');

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
    const name = nameEl.value;
    const email = emailEl.value;
    const job = jobEl.value;
    const bio = bioEl.value;
    const fb = fbEl.value;
    const ins = insEl.value;
    const tw = twEl.value;
    const social = [fb, ins, tw];

    updateProfile({ name, email, job, bio, social }, 'Profile');
  });

if (passwordForm)
  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('save-password').textContent = 'Updating...';
    const passwordCur = document.getElementById('passowrd').value;
    const newPassword = document.getElementById('passowrdNew').value;
    const passwordCon = document.getElementById('passowrdConf').value;
    await updateProfile({ passwordCur, newPassword, passwordCon }, 'Password');
    document.getElementById('save-password').textContent = 'Save password';

    document.getElementById('passowrd').value = '';
    document.getElementById('passowrdNew').value = '';
    document.getElementById('passowrdConf').value = '';
  });
