import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
  try {
    const res = await axios.post(
      `/api/user/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log("accessToken", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to handle it higher up the chain.
  }
};

export const createAxios = (user, dispatch, stateUser) => {
  const newInstance = axios.create();

  newInstance.interceptors.request.use(
    async (config) => {
      if (user?.accessToken) {
        const date = new Date();
        const decodeToken = jwt_decode(user?.accessToken);
        if (decodeToken.exp < date.getTime() / 1000) {
          try {
            const data = await refreshToken();
            const refreshUser = {
              ...user,
              accessToken: data?.accessToken,
            };
            console.log("refreshUser", refreshUser);
            dispatch(stateUser(refreshUser));
            //Update the Authorization header with the new token
            config.headers.token = "Bearer " + data?.accessToken;
          } catch (error) {
            // Handle the error if refresh token fails
            console.log("Error refreshing token:", error);
            // Optionally, you may want to log out the user or handle the error in a meaningful way.
          }
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return newInstance;
};

// import axios from "axios";
// import jwt_decode from 'jwt-decode'

// const refreshToken = async() => {
//     try {
//       const res = await axios.post(`/api/user/refresh-token`, {
//         withCredentials: true,
//       })
//       return res.data
//     } catch (error) {
//       console.log(error);
//     }
//   }

// export const createAxios = (user, dispatch, stateUser) => {
//     const newInstance = axios.create()

//     newInstance.interceptors.request.use(
//         async(config) => {
//           let date = new Date()
//           const decodeToken = jwt_decode(user?.accessToken)
//           if(decodeToken.exp < date.getTime() / 1000) {
//             const data = await refreshToken()
//             const refreshUser = {
//               ...user,
//               accessToken: data?.accessToken
//             }
//             dispatch(stateUser(refreshUser))
//             //thay thế header thành header mới thông qua config
//             config.headers['token'] = 'Bearer ' + data?.accessToken
//           }
//           return config
//         },(err) => {
//           return Promise.reject(err)
//         }
//       )
//       return newInstance
// }
