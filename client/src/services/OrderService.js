import axios from "axios";

export const createOrder = async (data) => {
  const res = await axios.post(`/api/order/create`, data);
  return res.data;
};

export const getOrderByUserId = async (id) => {
  const res = await axios.get(`/api/order/get-order-details/${id}`);
  return res.data;
};

export const getOrderDetail = async (id) => {
  const res = await axios.get(`/api/order/get-order-detail/${id}`);
  return res.data;
};

export const cancelOrder = async (id, orderItems) => {
  const res = await axios.delete(`/api/order/cancel-order/${id}`, {data: orderItems});
  return res.data;
};

export const getAllOrder = async () => {
  const res = await axios.get(`/api/order/get-all-order`);
  return res.data;
};
