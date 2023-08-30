import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
   // State username với giá trị mặc định là "Guest"
  // Có thể khai báo nhiều state khác nữa
  name: '',
  email: '',
  accessToken: '',
  id: '',
  phone: '',
  address: '',
  avatar: '',
  city: '',
  isAdmin: false,
};


// Cấu hình slice
export const userSlice = createSlice({
  name: "user",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    updateUser: (state, action) => {
      const {name, email, accessToken, _id, address, avatar, phone, isAdmin, city} = action.payload
      state.name = name 
      state.email = email
      state.accessToken = accessToken
      state.id = _id
      state.address = address
      state.avatar = avatar
      state.phone = phone
      state.isAdmin = isAdmin
      state.city = city
    },
    resetUser: (state) => {
      state.name = ''
      state.email = ''
      state.id = ''
      state.address = ''
      state.avatar = ''
      state.phone = ''
      state.city = ''
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { updateUser, resetUser } = userSlice.actions;

// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(updateUsername()) để xem chi tiết



// Export reducer để nhúng vào Store
export default userSlice.reducer;