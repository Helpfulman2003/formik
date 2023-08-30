import React, { useEffect, useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperLabel,
  WrapperTextLight,
} from "./style";
// import InputForm from "../../components/InputForm/InputForm";
import { Button, Image, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import LogoLogin from "../../assets/images/logoLogin.png";
import { useNavigate } from "react-router-dom";
import { WrapperInputStyle } from "../../components/InputForm/style";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponet/Loading";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutationHook((data) => UserService.signupUser(data));

  const { data, isLoading, isError, isSuccess } = mutation;

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      toast.success(data?.message || "Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleNavigateSignIn()
    } else if (!isError && data?.status === "ERR") {
      toast.error(data?.message || "Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isError, isSuccess, data]);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSingUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
            placeholder="Input password"
            value={password}
            onChange={handleChangePassword}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Input.Password
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ marginTop: "10px" }}
          />
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <Button
              style={{
                background:
                  password || email || confirmPassword
                    ? "rgb(255, 57, 69)"
                    : "#ccc",
                color: "#fff",
                height: "48px",
                width: "100%",
                border: "none",
                fontSize: "16px",
                fontWeight: "700",
                margin: "26px 0 10px",
              }}
              onClick={handleSingUp}
            >
              Đăng ký
            </Button>
          </Loading>
          <p>
            <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          </p>
          <p>
            Bạn đã có tài khoản?
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
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
