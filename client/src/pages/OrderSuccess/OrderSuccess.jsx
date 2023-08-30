import React from "react";
import {
  Lable,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperValue,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";
import { orderConstant } from "../../constant";

const OrderSuccess = () => {
  const order = useSelector((state) => state?.order);
  console.log("order", order?.orderItemSelected);
  const user = useSelector((state) => state?.user);
  const location = useLocation();
  console.log(location);
  const { state } = location;

  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Thanh toán</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Lable>Phương thức giao hàng</Lable>
                <WrapperValue>
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {orderConstant.delivery[state?.delivery]}
                  </span>
                  Giao hàng nhanh
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable> Phương thức thanh toán</Lable>
                <WrapperValue>
                  {orderConstant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>

            <WrapperInfo>
              {state?.orders?.map((order) => {
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
                          Giá tiền: {convertPrice(order?.price)}
                        </span>
                      </span>

                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          Số lượng: {order?.amount}
                        </span>
                      </span>
                    </div>
                  </WrapperItemOrder>
                );
              })}

              <div>
                <span
                  style={{
                    color: "rgb(255, 66, 78)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Tổng tiền: {convertPrice(Number(state?.total))}
                </span>
              </div>
            </WrapperInfo>
          </WrapperLeft>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
