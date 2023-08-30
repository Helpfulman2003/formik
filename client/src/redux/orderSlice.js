import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // State username với giá trị mặc định là "Guest"
  // Có thể khai báo nhiều state khác nữa
  orderItems: [],
  orderItemSelected: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice({
  name: "order", // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    addOrder: (state, action) => {
      const item = action.payload;
      const itemOrder = state?.orderItems?.find(
        (orderItem) => orderItem?.product === item?.product
      );
      if (itemOrder) {
        itemOrder.amount += item?.amount;
      } else {
        state.orderItems.push(item);
      }
    },

    removeOrder: (state, action) => {
      const idProduct = action.payload;
      const itemOrder = state?.orderItems?.filter(
        (orderItem) => orderItem?.product !== idProduct
      );
      const itemOrderSelected = state?.orderItemSelected?.filter(
        (orderItem) => orderItem?.product !== idProduct
      );
      state.orderItems = itemOrder;
      state.orderItemSelected = itemOrderSelected;
    },

    removeAllOrder: (state, action) => {
      const idProducts = action.payload;
      const itemOrder = state?.orderItems?.filter(
        (orderItem) => !idProducts.includes(orderItem?.product)
      );
      const itemOrderSelected = state?.orderItemSelected?.filter(
        (orderItem) => !idProducts.includes(orderItem?.product)
      );
      state.orderItems = itemOrder;
      state.orderItemSelected = itemOrderSelected;
    },

    inCreaseAmount: (state, action) => {
      const idProduct = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemSelected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },

    decreaseAmount: (state, action) => {
      const idProduct = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemSelected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount--;
      if (itemOrderSelected) itemOrderSelected.amount--;
    },

    selectedOrder: (state, action) => {
      const orderSelected = []
      state.orderItems.forEach((order) => {
        const listChecked = action.payload;
        if (listChecked.includes(order?.product)) {
          orderSelected.push(order);
        }
      });
      state.orderItemSelected = orderSelected;
    },
  },
});

export const {
  addOrder,
  removeOrder,
  inCreaseAmount,
  decreaseAmount,
  removeAllOrder,
  selectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
