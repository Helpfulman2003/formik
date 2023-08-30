import React, { useEffect, useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperLabel,
  WrapperTextLight,
} from "./style";
// import InputForm from "../../components/InputForm/InputForm";
import { Button, Image, Input } from "antd";
import LogoLogin from "../../assets/images/logoLogin.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { WrapperInputStyle } from "../../components/InputForm/style";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponet/Loading";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice";

export default function SignInPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { state } = useLocation();

  const mutation = useMutationHook((data) => UserService.loginUser(data));

  const { data, isLoading, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      if (state) navigate(state);
      else navigate("/");
      // localStorage.setItem("accessToken", JSON.stringify(data?.accessToken));
      //   if (data?.accessToken) {
      //     const decoded = jwt_decode(data?.accessToken);
      //     if (decoded?.id) {
      //       handleGetDetailUser(decoded?.id, data?.accessToken);
      //     }
      //   }
      console.log("data", data);
      dispatch(updateUser({ ...data?.data, accessToken: data?.accessToken }));
    }
  }, [isSuccess, data]);

  // const handleGetDetailUser = async (id, accessToken) => {
  //   const res = await UserService.getDetailUser(id, accessToken);
  //   dispatch(updateUser({ ...res?.data, accessToken: accessToken }));
  // };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          margin: "auto",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p style={{ margin: "10px 0 10px" }}>Đăng nhập vào tài khoản</p>
          <WrapperInputStyle
            placeholder="Nhập text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            placeholder="Password"
            onChange={handleChangePassword}
            value={password}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <Button
              style={{
                background: password || email ? "rgb(255, 57, 69)" : "#ccc",
                color: "#fff",
                height: "48px",
                width: "100%",
                border: "none",
                fontSize: "16px",
                fontWeight: "700",
                margin: "26px 0 10px",
              }}
              onClick={handleSignIn}
            >
              Đăng nhập
            </Button>
          </Loading>
          <p>
            <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Đăng ký
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image
            src={LogoLogin}
            preview={false}
            width={204}
            height={204}
          ></Image>
          <WrapperLabel>Mua sắm tại Tiki</WrapperLabel>
          <p
            style={{
              fontSize: "13px",
              color: "rgb(11, 116, 229)",
              fontWeight: "500",
            }}
          >
            Siêu ưu đãi mỗi ngày
          </p>
        </WrapperContainerRight>
      </div>
    </div>
  );
}
