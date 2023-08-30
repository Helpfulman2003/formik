import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // State username với giá trị mặc định là "Guest"
  // Có thể khai báo nhiều state khác nữa
  product: {
    data: [],
    isLoading: "false",
    isSuccess: "false",
    isErrorr: "false",
  },
  search: "",
  type: [],
};

export const productSlice = createSlice({
  name: "product", // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    getAllproduct: (state, action) => {
      state.product.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    getAllType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { getAllproduct, searchProduct, getAllType } =
  productSlice.actions;

export default productSlice.reducer;
