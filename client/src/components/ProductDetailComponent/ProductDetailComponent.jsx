import { Button, Col, Image, Row } from "antd";
import React, { useState } from "react";
import { StarFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import test from "../../assets/images/test.webp";
import testsmall from "../../assets/images/testsmall.webp";
import { useQuery } from "@tanstack/react-query";
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import { WrapperButtonMore } from "../../pages/HomePage/style";
import { getDetailProduct } from "../../services/ProductService";
import Loading from "../LoadingComponet/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrder } from "../../redux/orderSlice";
import { convertPrice } from "../../utils";

export default function ProductDetailComponent({ idProduct }) {
  const [valueInput, setValueInput] = useState(1);
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchGetDetailProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    const res = await getDetailProduct(id);
    return res;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product-detail", idProduct],
    queryFn: fetchGetDetailProduct,
    enabled: !!idProduct,
  });

  const renderStart = (number) => {
    const stars = [];
    for (let i = 0; i < number; i++) {
      stars.push(
        <StarFilled
          key={i}
          style={{
            fontSize: "12px",
            color: "rgb(253, 216, 54)",
            marginRight: "4px",
          }}
        />
      );
    }
    return stars;
  };

  const handleChangeCount = (action) => {
    if (action === "increase") setValueInput(valueInput + 1);
    else if (action === "decrease") setValueInput(valueInput - 1);
  };

  const onChange = (value) => {
    setValueInput(value);
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location.pathname });
    } else {
      const orderItem = {
        name: data?.data?.name,
        amount: valueInput,
        image: data?.data?.image,
        price: data?.data?.price,
        product: data?.data?._id,
        discount: data?.data?.discount,
      };
      dispatch(addOrder(orderItem));
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <Row style={{ background: "#fff" }}>
        <Col
          style={{ padding: "16px", borderRight: "1px solid #e5e5e5" }}
          span={10}
        >
          <Image src={data?.data.image} preview={false} />
          <div>
            <Row
              justify="space-between"
              gutter={[10, 10]}
              style={{ paddingTop: "10px" }}
            >
              <Col span={4}>
                <WrapperStyleImageSmall src={testsmall} preview={false} />
              </Col>
              <Col span={4}>
                <WrapperStyleImageSmall src={testsmall} preview={false} />
              </Col>
              <Col span={4}>
                <WrapperStyleImageSmall src={testsmall} preview={false} />
              </Col>
              <Col span={4}>
                <WrapperStyleImageSmall src={testsmall} preview={false} />
              </Col>
              <Col span={4}>
                <WrapperStyleImageSmall src={testsmall} preview={false} />
              </Col>
              <Col span={4}>
                <WrapperStyleImageSmall src={testsmall} preview={false} />
              </Col>
            </Row>
          </div>
        </Col>

        <Col span={14} style={{ padding: "0 10px" }}>
          <WrapperStyleNameProduct>{data?.data?.name}</WrapperStyleNameProduct>
          <div>
            {renderStart(data?.data?.rating)}
            <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(data?.data?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>

          <WrapperAddressProduct>
            <span>Giao đến</span>
            <span className="address">{user?.address} </span>
            <span className="change-address">Đổi địa chỉ</span>
          </WrapperAddressProduct>

          <div
            style={{
              padding: "10px 0",
              margin: "10px 0 20px",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div style={{ marginBottom: "10px" }}>Số lượng</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <WrapperButtonMore
                onClick={() => handleChangeCount("decrease")}
                type="text"
                color="#e7e7e7"
                style={{ color: "#000", border: "1px solid #e7e7e7" }}
              >
                <MinusOutlined
                  style={{ color: "#787878", cursor: "pointer" }}
                />
              </WrapperButtonMore>
              <WrapperInputNumber
                style={{ height: "38px", width: "40px" }}
                bordered={false}
                controls={false}
                value={valueInput < 0 ? 0 : valueInput}
                onChange={onChange}
              />

              <WrapperButtonMore
                onClick={() => handleChangeCount("increase")}
                type="text"
                color="#e7e7e7"
                style={{ color: "#000", border: "1px solid #e7e7e7" }}
              >
                <PlusOutlined style={{ color: "#787878", cursor: "pointer" }} />
              </WrapperButtonMore>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <Button
                style={{
                  background: "rgb(255, 57, 69)",
                  color: "#fff",
                  height: "48px",
                  width: "220px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
                onClick={handleAddOrderProduct}
              >
                Chọn mua
              </Button>
            </div>
            <div>
              <Button
                style={{
                  background: "#fff",
                  color: "rgb(13, 92, 182)",
                  height: "48px",
                  width: "220px",
                  border: "1px solid rgb(13, 92, 182)",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Mua trả sau
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Loading>
  );
}
