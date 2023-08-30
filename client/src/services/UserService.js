import axios from "axios";

export const loginUser = async (data) => {
  const res = await axios.post(`/api/user/sign-in`, data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(`/api/user/sign-up`, data);
  return res.data;
};

export const getDetailUser = async (id, accessToken, axiosJWT) => {
  const res = await axiosJWT.get(`/api/user/get-detail/${id}`, {
    headers: {
      token: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const logOut = async () => {
  const res = await axios.post(`/api/user/logout`);
  return res.data;
};

export const update = async (id, data, accessToken, axiosJWT) => {
  const res = await axiosJWT.put(`/api/user/update-user/${id}`, data, {
    headers: {
      token: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const deleteUser = async (id, accessToken, axiosJWT) => {
  const res = await axiosJWT.delete(`/api/user/delete-user/${id}`, {
    headers: {
      token: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const getAll = async (accessToken, axiosJWT) => {
  const res = await axiosJWT.get(`/api/user/getAll`, {
    headers: {
      token: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
