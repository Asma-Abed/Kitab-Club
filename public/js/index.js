import mongoose from 'mongoose';

import { login, logout } from './login';
import { updateProfile } from './updateProfile';
import { updateClub, getManager } from './updatePages';

const loginForm = document.getElementById('form');
const logoutButton = document.getElementById('logout');

const updateForm = document.getElementById('update');

const updateClubForm = document.getElementById('update-club');

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
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const job = document.getElementById('job').value;
    const bio = document.getElementById('bio').value;
    const fb = document.getElementById('urlfb').value;
    const ins = document.getElementById('urlin').value;
    const tw = document.getElementById('urltw').value;
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

if (updateClubForm)
  updateClubForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('book-name').value;
    const booksNumber = document.getElementById('nBooks').value;
    const time = document.getElementById('time').value;
    const books = document.getElementById('books').value;
    const quote = document.getElementById('quote').value;
    const description = document.getElementById('description').value;
    const managerSlug = document.getElementById('manager').value;
    const idea1 = document.getElementById('idea1').value;
    const idea2 = document.getElementById('idea2').value;
    const idea3 = document.getElementById('idea3').value;
    const idea4 = document.getElementById('idea4').value;
    const benefits = [idea1, idea2, idea3, idea4];
    const id = document.getElementById('id').value;
    const slug = document.getElementById('slug').value;

    const managerId = await getManager(managerSlug);
    const manager = managerId;

    updateClub(id, slug, {
      name,
      booksNumber,
      time,
      quote,
      description,
      manager,
      benefits,
    });
  });
