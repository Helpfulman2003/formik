import { useQuery } from "@tanstack/react-query";
import React from "react";
import { cancelOrder, getOrderByUserId } from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { Button } from "antd";
import Loading from "../../components/LoadingComponet/Loading";
import {
  WrapperContainer,
  WrapperFooterItem,
  WrapperHeaderItem,
  WrapperItemOrder,
  WrapperListOrder,
  WrapperStatus,
} from "./style";
import { useNavigate } from "react-router-dom";
import {useMutationHook} from '../../hooks/useMutationHook'

const MyOrder = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user);
  const fetchMyOrder = async () => {
    const res = await getOrderByUserId(user?.id);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["order"], queryFn: fetchMyOrder });
  const { data, isLoading } = queryOrder;

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
          <img
            src={order?.image}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              border: "1px solid rgb(238, 238, 238)",
              padding: "2px",
            }}
          />
          <div
            style={{
              width: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            {order?.name}
          </div>
          <span
            style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}
          >
            {convertPrice(order?.price)}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`)
  }

  const mutation = useMutationHook((data) => {
    const {id, orderItems} = data
    const res = cancelOrder(id, orderItems)
    return res
  })

  const handleCanceOrder = (order) => {
    mutation.mutate({id: order._id, orderItems: order?.orderItems}, {
      onSettled: () => {
        queryOrder.refetch()
      }
    })
  }

  const {isLoading: isLoadingCancel} = mutation

  return (
    <Loading isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h4>Đơn hàng của tôi</h4>
          <WrapperListOrder>
          {data?.data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{fontSize: '14px', fontWeight: 'bold'}}>Trạng thái</span>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Giao hàng: </span>
                      <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order.isDelivered ? 'Đã giao hàng': 'Chưa giao hàng'}`}</span>
                    </div>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Thanh toán: </span>
                      <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'}`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Tổng tiền: </span>
                      <span 
                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)',fontWeight: 700 }}
                      >{convertPrice(order?.totalPrice)}</span>
                    </div>
                    <div style={{display: 'flex', gap: '10px'}}>
                    <Button
                         onClick={() => handleCanceOrder(order)}
                        size={40}
                        style={{
                            height: '36px',
                            border: '1px solid #9255FD',
                            borderRadius: '4px'
                        }}
                      >
                        <span style={{ color: '#9255FD', fontSize: '14px' }}>Hủy đơn hàng</span>
                      </Button>
                      <Button
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        style={{
                          height: '36px',
                          border: '1px solid #9255FD',
                          borderRadius: '4px'
                      }}
                      >
                        <span style={{ color: '#9255FD', fontSize: '14px' }}>Xem chi tiết</span>
                      </Button>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrder;
