import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index";
import DefaultComponent from "./components/DefaulComponet/DefaultComponent";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "./redux/userSlice";
// import {createAxios} from './createInstance'
// import {getDetailUser} from './services/UserService'

function App() {
  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  // const dispatch = useDispatch()
  //  const user = useSelector((state) => state?.user)

  //  let axiosJWT = createAxios(user, dispatch, updateUser)

  // const fetchApi = async () => {
  //   try {
  //     const res = await getDetailUser(user?.id,user?.accessToken, axiosJWT)
  //     return res.data;
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post(`/api/user/refresh-token`, {
  //       withCredentials: true,
  //     });
  //     console.log('data', res.data);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error; // Re-throw the error to handle it higher up the chain.
  //   }
  // };

  // useEffect(() => {
  //   refreshToken()
  // }, [])

  return (
    <div>
      <Router>
        <Routes>
          {routes?.map((route, index) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
