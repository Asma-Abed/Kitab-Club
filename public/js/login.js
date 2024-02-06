import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/members/login',
      data: {
        email,
        password,
      },
    });
    // console.log(res);
    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/members/logout',
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
