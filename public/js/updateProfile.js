import axios from 'axios';

export const updateProfile = async (name, email, job, bio, social) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/members/updateMyProfile',
      data: {
        name,
        email,
        job,
        bio,
        social,
      },
    });
    if (res.data.status === 'success') {
      alert('Profile updated successfully!');
      window.setTimeout(() => {
        location.assign('/myProfile');
      }, 1500);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
