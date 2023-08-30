import axios from "axios";
export const getProduct = async (search, limit) => {
  let res = {};
  if (!search) res = await axios.get(`/api/product/get-all?limit=${limit}`);
  else
    res = await axios.get(
      `/api/product/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`/api/product/create`, data);
  return res.data;
};

export const getDetailProduct = async (id) => {
  const res = await axios.get(`/api/product/detail/${id}`);
  return res.data;
};

export const getProductType = async (type, page, limit) => {
  if (type) {
    const res = await axios.get(
      `/api/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`
    );
    return res.data;
  }
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(`/api/product/get-all-type`);
  return res.data;
};

export const upDateProduct = async (data, id) => {
  const res = await axios.put(`/api/product/update/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`/api/product/delete/${id}`);
  return res.data;
};

export const deleteManyProduct = async (ids) => {
  const res = await axios.post(`/api/product/deletemany-product`, ids);
  return res.data;
};
