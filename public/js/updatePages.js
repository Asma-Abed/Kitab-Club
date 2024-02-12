import axios from 'axios';

export const getManager = async (slug) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/members/manager/${slug}`,
    });
    if (res.data.status === 'success') {
      const managerId = res.data.data.manager._id;
      return managerId;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const updateClub = async (id, slug, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/clubs/${id}`,
      data,
    });
    if (res.data.status === 'success') {
      alert('Club updated successfully!');
      window.setTimeout(() => {
        location.assign(`/clubs/${slug}`);
      }, 1500);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
