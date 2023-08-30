import React from "react";
import { WrapperHeader } from "./style";
import Loading from "../LoadingComponet/Loading";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { createAxios } from "../../createInstance";
import { getAllOrder } from "../../services/OrderService";
import {orderConstant} from "../../constant"
import TableComponentOrder from "../TableComponent/TableComponentOrder.jsx";
import PieChartComponent from "./PieChart";

export default function OrderAdmin() {
  const user = useSelector((state) => state?.user);

  const queryOrder = useQuery(["Order"], getAllOrder);
  const { data: orders, isLoading: isLoadingOrder } = queryOrder;

  console.log('orders', orders);

  const dataTable = orders?.data?.map((order) => {
    return {...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, paymentMethod: orderConstant.payment[order?.paymentMethod], isPaid: order?.isPaid ? 'TRUE' : 'FALSE' }
  })

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <PieChartComponent data={orders?.data}/>
      <div style={{ marginTop: "20px" }}>
        <TableComponentOrder
          user={dataTable}
          isLoading={isLoadingOrder}
        />
      </div>
    </div>
  );
}
