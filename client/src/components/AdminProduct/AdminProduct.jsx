import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponentProduct";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { getBase64 } from "../../utils";
import {
  createProduct,
  deleteProduct,
  getAllTypeProduct,
  getProduct,
  upDateProduct,
} from "../../services/ProductService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponet/Loading";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getAllproduct } from "../../redux/productSlice";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";

export default function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isImage, setIsImage] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const typeProduct = useSelector((state) => state?.product?.type);
  const [option, setOption] = useState();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const image = useRef();
  const imageUpdate = useRef();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handelCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const mutation = useMutationHook(createProduct);
  const { data, isLoading, isSuccess, isError } = mutation;

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsImage(null);
  };

  const onFinish = (value) => {
    if (!option) {
      value = { ...value, image: image.current };
      mutation.mutate(value, {
        onSettled: () => queryProduct.refetch(),
      });
    } else {
      value = { ...value, image: image.current, type: value.newType };
      typeProduct = [...typeProduct, value.type]
      dispatch(getAllTypeProduct(typeProduct))
      mutation.mutate(value, {
        onSettled: () => queryProduct.refetch(),
      });
    }
  };

  const handleOnchangeAvatar = async ({ fileList, value }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    image.current = file.preview;
    imageUpdate.current = file.preview;
    setIsImage(file.preview);
  };

  const queryProduct = useQuery(["Products"], getProduct);
  const { data: products, isLoading: isLoadingProduct } = queryProduct;

  const productsArray = products?.data?.map((product) => {
    return { ...product, key: product?._id };
  });

  const mutationUpdate = useMutationHook((data) => {
    const { id, ...rest } = data;
    return upDateProduct(rest, id);
  });
  const {
    data: dataUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErorrUpdate,
    isLoading: isLoadingUpdate,
  } = mutationUpdate;

  const onUpdateProduct = (value) => {
    value = { ...value, image: imageUpdate.current};
    mutationUpdate.mutate(
      { ...value, id: rowSelected },
      {
        onSettled: () => queryProduct.refetch(),
      }
    );
  };

  const handelClose = () => {
    setIsOpenDrawer(false);
    formUpdate.resetFields();
    setIsImage(null);
  };

  const mutationDelete = useMutationHook(deleteProduct);
  const {
    data: dataDelete,
    isLoading: isLoadingDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
  } = mutationDelete;

  const handleDeleteProduct = () => {
    mutationDelete.mutate(rowSelected, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const renderType = (types) => {
    let results = [];
    if (types) {
      results = types?.map((type) => {
        return {
          value: type,
          label: type,
        };
      });
    }
    results.push({ table: "Thêm type", value: "add_type" });
    return results;
  };

  const handleChange = (value) => {
    if (value === "add_type") setOption(value);
  };

  useEffect(() => {
    if (isSuccessDelete && dataDelete?.status === "OK") {
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
      handelCancelDelete();
    } else if (!isErrorDelete && dataDelete?.status === "ERR") {
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
  }, [isErrorDelete, isSuccessDelete, dataDelete]);

  useEffect(() => {
    dispatch(getAllproduct(products?.data));
  }, [products?.data]);

  useEffect(() => {
    if (isSuccessUpdate && dataUpdate?.status === "OK") {
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
      handelClose();
    } else if (!isErorrUpdate && dataUpdate?.status === "ERR") {
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
  }, [isErorrUpdate, isSuccessUpdate, dataUpdate]);

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
      handleCancel();
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

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={showModal}
          icon={<PlusOutlined style={{ fontSize: "40px" }} />}
        ></Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          products={productsArray}
          isLoading={isLoadingProduct}
          setIsOpenDrawer={setIsOpenDrawer}
          setRowSelected={setRowSelected}
          setIsModalOpenDelete={setIsModalOpenDelete}
          queryProduct={queryProduct}
        />
      </div>
      <ModalComponent
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        forceRender
      >
        <Loading isLoading={isLoading}>
          <Form
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
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
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <Select
                value={option}
                onChange={handleChange}
                options={renderType(typeProduct)}
              />
            </Form.Item>

            {option && (
              <Form.Item
                label="New type"
                name="newType"
                rules={[
                  {
                    required: true,
                    message: "Please input your type!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )}

            <Form.Item
              label="Count in stock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count in stock!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input your discount!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Image"
              name="Image"
              rules={[
                {
                  required: true,
                  message: "Please input your image!",
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button>Upload</Button>
                <div>
                  {isImage && (
                    <img
                      src={isImage}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
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
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Count in stock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count in stock!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input your discount!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Image"
              name="Image"
              rules={[
                {
                  required: true,
                  message: "Please input your image!",
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button>Upload</Button>
                <div>
                  {isImage && (
                    <img
                      src={isImage}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </WrapperUploadFile>
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
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handelCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isLoading={isLoadingDelete}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
}
