import axios from 'axios';

export const updateProfile = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/members/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/members/updateMyProfile';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      alert(`${type} updated successfully!`);
      window.setTimeout(() => {
        location.assign('/myProfile');
      }, 1500);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
