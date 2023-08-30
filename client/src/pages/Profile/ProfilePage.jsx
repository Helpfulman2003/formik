import React, { useEffect, useState } from "react";
import {
  WrapperContainerProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { Button, Upload } from "antd";
import InputForm from "../../components/InputForm/InputForm";
import { update } from "../../services/UserService";
import { updateUser } from "../../redux/userSlice";
import { useMutationHook } from "../../hooks/useMutationHook";
import { toast } from "react-toastify";
import Loading from "../../components/LoadingComponet/Loading";
import { UploadOutlined } from "@ant-design/icons";

import { createAxios } from "../../createInstance";
import { getBase64 } from "../../utils";

// import { getDetailUser } from "../../services/UserService";

export default function ProfilePage() {
  const user = useSelector((state) => state?.user);
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [avatar, setAvatar] = useState(user?.avatar);

  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, updateUser);
  console.log("user", user?.accessToken);

  // const fetchApi = async () => {
  //   try {
  //     const res = await getDetailUser(user?.id,user?.accessToken, axiosJWT)
  //     console.log('res', res.data);
  //     return res.data;
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  // const handleUpdate = async() => {
  //   console.log('user', user?.id);
  //   const res = await update(user?.id, {name})
  //   dispatch(updateUser(res?.data))
  // }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const mutation = useMutationHook((data) => {
    const { id, ...rests } = data;
    return update(id, rests, user?.accessToken, axiosJWT);
  });
  const { data, isLoading, isSuccess, isError } = mutation;

  const dataUpdate = { ...data?.data, accessToken: user?.accessToken };

  const handleUpdate = () => {
    if (user && user.id && name && email && phone && address && avatar) {
      mutation.mutate({
        id: user?.id,
        name,
        email,
        phone,
        address,
        avatar,
      });
    } else {
      toast.error("Please fill in all required fields.", {
        // Toast configuration for missing data message
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

      dispatch(updateUser(dataUpdate));
    }
  }, [isSuccess, data]);

  return (
    <div style={{ padding: "0 120px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isLoading={isLoading}>
        <WrapperContainerProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              style={{ transform: "translateY(5px)", width: "300px" }}
              id="name"
              value={name}
              handleFunction={(e) => setName(e.target.value)}
            ></InputForm>
            <Button
              onClick={handleUpdate}
              style={{
                color: "rgb(26, 148, 255)",
                border: "1px solid rgb(26, 148, 255)",
                height: "30px",
                width: "max-content",
                fontSize: "16px",
                fontWeight: "700",
                padding: "2px 6px 6px",
              }}
            >
              Cập nhật
            </Button>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              style={{ transform: "translateY(5px)", width: "300px" }}
              id="email"
              value={email}
              handleFunction={(e) => setEmail(e.target.value)}
            ></InputForm>
            <Button
              style={{
                color: "rgb(26, 148, 255)",
                border: "1px solid rgb(26, 148, 255)",
                height: "30px",
                width: "max-content",
                fontSize: "16px",
                fontWeight: "700",
                padding: "2px 6px 6px",
              }}
            >
              Cập nhật
            </Button>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm
              style={{ transform: "translateY(5px)", width: "300px" }}
              id="phone"
              value={phone}
              handleFunction={(e) => setPhone(e.target.value)}
            ></InputForm>
            <Button
              style={{
                color: "rgb(26, 148, 255)",
                border: "1px solid rgb(26, 148, 255)",
                height: "30px",
                width: "max-content",
                fontSize: "16px",
                fontWeight: "700",
                padding: "2px 6px 6px",
              }}
            >
              Cập nhật
            </Button>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm
              style={{ transform: "translateY(5px)", width: "300px" }}
              id="address"
              value={address}
              handleFunction={(e) => setAddress(e.target.value)}
            ></InputForm>
            <Button
              style={{
                color: "rgb(26, 148, 255)",
                border: "1px solid rgb(26, 148, 255)",
                height: "30px",
                width: "max-content",
                fontSize: "16px",
                fontWeight: "700",
                padding: "2px 6px 6px",
              }}
            >
              Cập nhật
            </Button>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <Button
              style={{
                color: "rgb(26, 148, 255)",
                border: "1px solid rgb(26, 148, 255)",
                height: "30px",
                width: "max-content",
                fontSize: "16px",
                fontWeight: "700",
                padding: "2px 6px 6px",
              }}
            >
              Cập nhật
            </Button>
          </WrapperInput>
        </WrapperContainerProfile>
      </Loading>
    </div>
  );
}
