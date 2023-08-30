import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Input } from "antd";
import Loading from "../LoadingComponet/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import { deleteUser, getAll, update } from "../../services/UserService";
import { useQuery } from "@tanstack/react-query";
import { getAllproduct } from "../../redux/productSlice";
import { createAxios } from "../../createInstance";
import { updateUser } from "../../redux/userSlice";
import TableComponentUser from "../TableComponent/TableComponentUser";

export default function AdminUser() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, updateUser);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [rowSelected, setRowSelected] = useState("");

  const [formUpdate] = Form.useForm();

  const handelCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const getAllUser = async () => {
    const res = await getAll(user?.accessToken, axiosJWT);
    return res;
  };

  const queryUser = useQuery(["User"], getAllUser);
  const { data: users, isLoading: isLoadingProduct } = queryUser;

  const userArray = users?.data?.map((user) => {
    return {
      ...user,
      key: user?._id,
      isAdmin: user?.isAdmin ? "True" : "False",
    };
  });

  const mutationUpdate = useMutationHook((data) => {
    const { id, accessToken, axiosJWT, ...rest } = data;
    return update(id, rest, accessToken, axiosJWT);
  });
  const {
    data: dataUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    isLoading: isLoadingUpdate,
  } = mutationUpdate;

  const onUpdateProduct = (value) => {
    mutationUpdate.mutate(
      {
        ...value,
        id: rowSelected,
        accessToken: user?.accessToken,
        axiosJWT: axiosJWT,
      },
      {
        onSettled: () => queryUser.refetch(),
      }
    );
  };

  const handelClose = () => {
    setIsOpenDrawer(false);
    formUpdate.resetFields();
  };

  const mutationDelete = useMutationHook((data) => {
    const { id, accessToken, axiosJWT } = data;
    return deleteUser(id, accessToken, axiosJWT);
  });
  const {
    data: dataDelete,
    isLoading: isLoadingDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
  } = mutationDelete;

  const handleDeleteProduct = () => {
    mutationDelete.mutate(
      { id: rowSelected, accessToken: user?.accessToken, axiosJWT: axiosJWT },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccessDelete && dataDelete?.status === "OK") {
      toast.success(dataDelete?.message || "Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handelCancelDelete();
    } else if (!isErrorDelete && dataDelete?.status === "ERR") {
      toast.error(dataDelete?.message || "Error", {
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
  }, [isErrorDelete, isSuccessDelete, dataDelete]);

  // useEffect(() => {
  //   dispatch(getAllproduct(users?.data));
  // }, [users?.data, dispatch]);

  useEffect(() => {
    if (isSuccessUpdate && dataUpdate?.status === "OK") {
      toast.success(dataUpdate?.message || "Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handelClose();
    } else if (!isErrorUpdate && dataUpdate?.status === "ERR") {
      toast.error(dataUpdate?.message || "Error", {
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
  }, [isErrorUpdate, isSuccessUpdate, dataUpdate]);

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>

      <div style={{ marginTop: "20px" }}>
        <TableComponentUser
          user={userArray}
          isLoading={isLoadingProduct}
          setIsOpenDrawer={setIsOpenDrawer}
          setRowSelected={setRowSelected}
          setIsModalOpenDelete={setIsModalOpenDelete}
        />
      </div>

      <DrawerComponent
        title="Chi tiết người dùng"
        open={isOpenDrawer}
        onClose={handelClose}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate}>
          <Form
            form={formUpdate}
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 22,
            }}
            onFinish={onUpdateProduct}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={handelCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isLoading={isLoadingDelete}>
          <div>Bạn có chắc xóa người dùng này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
}
