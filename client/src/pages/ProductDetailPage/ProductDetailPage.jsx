import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "0 120px", background: "#efefef"}}>
      <h5 style={{padding: '10px 0'}}>
        <span
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          Trang chủ
        </span>
        <span>- Chi tiết sản phẩm</span>
      </h5>
      <ProductDetailComponent idProduct={id} />
    </div>
  );
}
