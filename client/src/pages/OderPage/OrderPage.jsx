import { Button, Form, Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  CustomCheckbox,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDilivery,
  WrapperTotal,
} from "./style";
import { toast } from "react-toastify";
import Loading from "../../components/LoadingComponet/Loading";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import { WrapperInputNumber } from "../../components/ProductDetailComponent/style";
import {
  decreaseAmount,
  inCreaseAmount,
  removeAllOrder,
  removeOrder,
  selectedOrder,
} from "../../redux/orderSlice";
import { convertPrice } from "../../utils";
import { createAxios } from "../../createInstance";
import { updateUser } from "../../redux/userSlice";
import { update } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import Step from "../../components/Step/Step";

const OrderPage = () => {
  const orders = useSelector((state) => state?.order?.orderItems);
  const orderSelected = useSelector((state) => state?.order?.orderItemSelected);
  const [listChecked, setListChecked] = useState([]);
  const user = useSelector((state) => state?.user);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, updateUser);

  const priceMemo = useMemo(() => {
    const result = orderSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [orderSelected]);

  const priceDiscountMemo = useMemo(() => {
    const result = orderSelected?.reduce((total, cur) => {
      return total + cur.discount * cur.amount;
    }, 0);
    if (Number(result)) return result;
    return 0;
  }, [orderSelected]);

  const diliveryPircetMemo = useMemo(() => {
    if (priceMemo >= 200000 && priceMemo < 500000) return 10000;
    else if (orderSelected?.length === 0 || priceMemo >= 500000) return 0;
    else return 20000;
  }, [priceMemo]);

  const totalPrice = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPircetMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPircetMemo]);

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListchecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListchecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      orders?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const handleChangeCount = (action, idProduct) => {
    if (action === "increase") dispatch(inCreaseAmount(idProduct));
    else if (action === "decrease") dispatch(decreaseAmount(idProduct));
  };

  const handleDelete = (id) => {
    dispatch(removeOrder(id));
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrder(listChecked));
    }
  };

  const handleOnchangeDetails = (e) => {
    const { name, value } = e.target;
    if (name) {
      setStateUserDetails({
        ...stateUserDetails,
        [name]: value,
      });
    }
  };

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setIsOpenModalUpdate(false);
  };

  const handleAddCard = () => {
    if (orderSelected?.length === 0) {
      toast.error("Vui lòng chọn sản phẩm");
    } else if (!user?.name || !user?.phone || !user?.address || !user?.city) {
      setIsOpenModalUpdate(true);
    } else {
      navigate("/payment");
    }
  };

  const mutationUpdate = useMutationHook((data) => {
    const { id, accessToken, axiosJWT, ...rest } = data;
    return update(id, rest.stateUserDetails, accessToken, axiosJWT);
  });
  const { data, isLoading } = mutationUpdate;

  const handleUpdateInfoUser = () => {
    if (user && user?.id) {
      mutationUpdate.mutate(
        {
          stateUserDetails,
          id: user?.id,
          accessToken: user?.accessToken,
          axiosJWT: axiosJWT,
        },
        {
          onSuccess: (updatedUserData) => {
            dispatch(updateUser(updatedUserData));
            setIsOpenModalUpdate(false);
          },
        }
      );
    }
  };

  const handleChangeAddress = () => {
    setIsOpenModalUpdate(true);
  };

  useEffect(() => {
    dispatch(selectedOrder(listChecked));
  }, [listChecked, dispatch]);

  const description = "";

  const item = [
    {
      title: "200000 VND",
      description: "Dưới 200000 VND",
    },
    {
      title: "10000 VND",
      description: "Từ 200000 VND đến dưới 500000 VND",
    },
    {
      title: "0 VND",
      description: "Trên 500000 VND",
    },
  ];

  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 style={{ fontWeight: "bold" }}>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            {/* <h4>Phí giao hàng</h4> */}
            <WrapperStyleHeaderDilivery>
              <Step
                items={item}
                current={
                  diliveryPircetMemo === 10000
                    ? 2
                    : diliveryPircetMemo === 20000
                    ? 1
                    : orderSelected?.length === 0
                    ? 0
                    : 3
                }
              />
            </WrapperStyleHeaderDilivery>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === orders?.length}
                ></CustomCheckbox>
                <span> Tất cả ({orders.length} sản phẩm)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {orders?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <CustomCheckbox
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></CustomCheckbox>
                      <img
                        src={order?.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          {convertPrice(order?.price)}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            padding: "4px",
                            borderRight: "1px solid #ccc",
                          }}
                          onClick={() => {
                            handleChangeCount("decrease", order?.product);
                          }}
                        >
                          <MinusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                        <WrapperInputNumber
                          defaultValue={order?.amount}
                          value={order?.amount < 0 ? 0 : order?.amount}
                          size="small"
                          min={1}
                          controls={false}
                          autoFocus={false}
                          max={order?.countInstock}
                          bordered={false}
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            padding: "4px",
                            borderLeft: "1px solid #ccc",
                          }}
                          onClick={() => {
                            handleChangeCount("increase", order?.product);
                          }}
                        >
                          <PlusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                      </WrapperCountOrder>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(order?.price * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(order?.product)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>
                    {`${user?.address} ${user?.city}`}{" "}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ cursor: "pointer" }}
                  >
                    Thay đổi
                  </span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {`${priceDiscountMemo}%`}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(diliveryPircetMemo)}
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(totalPrice)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <Button
              onClick={() => handleAddCard()}
              size={40}
              style={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
            >
              <span
                style={{ color: "#fff", fontSize: "15px", fontWeight: "700" }}
              >
                Mua hàng
              </span>
            </Button>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        isModalOpen={isOpenModalUpdate}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInfoUser}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="false"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input
                name="city"
                value={stateUserDetails["city"]}
                onChange={handleOnchangeDetails}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your  phone!" }]}
            >
              <Input
                name="phone"
                value={stateUserDetails["phone"]}
                onChange={handleOnchangeDetails}
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your  address!" },
              ]}
            >
              <Input
                name="address"
                value={stateUserDetails["address"]}
                onChange={handleOnchangeDetails}
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default OrderPage;
